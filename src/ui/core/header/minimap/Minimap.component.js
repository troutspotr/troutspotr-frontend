import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './Minimap.scss'
import {isRootPageByUrl, isStatePageByUrl} from 'ui/Location.selectors'
import debounce from 'lodash/debounce'
import SvgMapComponent from './svgMinimap/SvgMap.component'
import ActionButtonComponent from '../actionButton/ActionButton.component'
import {find, isEmpty} from 'lodash'
import {browserHistory} from 'react-router'
const MINIMAP_WIDTH = 50
class MinimapComponent extends Component {
  constructor () {
    super()
    this.getCSSRule = this.getCSSRule.bind(this)
    this.resizeEvent = this.resizeEvent.bind(this)
    this.onSelectState = this.onSelectState.bind(this)
    this.selectRegion = this.selectRegion.bind(this)
  }
  componentWillMount () {
    this.props.fetchTableOfContents()
    if (window) {
      this.debouncedResizeEvent = debounce(this.resizeEvent, 200)
      window.addEventListener('resize', this.debouncedResizeEvent)
      window.addEventListener('orientationchange', this.debouncedResizeEvent)
    }

    this.listenToRoutes()
  }

  listenToRoutes () {
    const {router} = this.props
    if (router == null) {
      console.log('No router found. Check Minimap component')
      return
    }

    router.listen(({pathname}) => {
      debugger
      if (isRootPageByUrl(pathname) || isStatePageByUrl(pathname)) {
        this.props.expand(true)
        return
      }

      this.props.expand(false)
    })
  }

  shouldComponentUpdate (nextProps) {
    return true
  }

  componentDidMount () {
    setTimeout(this.resizeEvent, 20)
  }

  componentWillUnmount () {
    if (window) {
      window.removeEventListener('resize', this.debouncedResizeEvent)
      window.removeEventListener('orientationchange', this.debouncedResizeEvent)
    }
  }

  /* eslint-disable complexity */
  /* eslint-disable max-depth */
  getCSSRule (ruleName, deleteFlag) {
    ruleName = ruleName.toLowerCase()
    if (document.styleSheets) {
      for (let i = 0; i < document.styleSheets.length; i++) {
        const styleSheet = document.styleSheets[i]
        let ii = 0
        let cssRule = false
        do {
          if (styleSheet.cssRules) {
            cssRule = styleSheet.cssRules[ii]
          } else {
            cssRule = styleSheet.rules[ii]
          }
          if (cssRule && cssRule.selectorText != null) {
            if (cssRule.selectorText.toLowerCase() === ruleName) {
              if (deleteFlag === 'delete') {
                if (styleSheet.cssRules) {
                  styleSheet.deleteRule(ii)
                } else {
                  styleSheet.removeRule(ii)
                }
                return true
              }
              return cssRule
            }
          }
          ii++
        } while (cssRule)
      }
    }
    return false
  }
  /* eslint-enable complexity */
  /* eslint-enable max-depth */

  resizeEvent () {
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width
    const height = (window.innerHeight > 0) ? window.innerHeight : screen.height

    const minimumDimension = Math.min(width, height - 170)
    const ratio = minimumDimension / MINIMAP_WIDTH
    const soughtClassRule = `.${classes.minimapContent}.${classes.expand}`

    const result = this.getCSSRule(soughtClassRule)
    const translateY = MINIMAP_WIDTH + 45
    const translateX = (width - (ratio * MINIMAP_WIDTH)) / 2
    const newStyle = `translateY(${Math.round(translateY)}px) translateX(${-Math.round(translateX)}px) scale(${ratio})`

    result.style.transform = newStyle
  }

  onSelectState (e) {
    const isNoRegionSelected = isEmpty(this.props.selectedRegion)
    if (this.props.isRootPage || isNoRegionSelected) {
      return
    }

    this.props.expand(!this.props.isExpanded)
  }

  selectRegion (e, region) {
    const shouldRespond = this.props.isExpanded
    // Do not respond to clicks when not expanded
    if (shouldRespond === false) {
      e.preventDefault()
      return false
    }

    e.stopPropagation()
    this.props.expand(false)
    const states = this.props.statesGeoJson.features
    if (isEmpty(states)) {
      throw new Error('Could not find state for region ', region)
    }

    const soughtState = find(states, (inspectedState) => inspectedState.properties.gid === region.properties.state_gid)
    if (soughtState == null) {
      throw new Error('Could not find state for region ', region)
    }

    const stateShortName = soughtState.properties.short_name.toLowerCase()
    const path = `/${stateShortName}/${region.properties.name.toLowerCase()}`
    browserHistory.push(path)
  }

  backButtonPressed = () => {
    if (this.props.isRootPage) {
      return
    }
    if (this.props.isExpanded === false) {
      return
    }

    if (isEmpty(this.props.selectedRegion)) {
      return
    }

    this.props.expand(false)
  }

  render () {
    const {isExpanded} = this.props
    const expandClass = isExpanded ? classes.expand : null
    const isMapMinimapLoaded = this.props.statesGeoJson != null && this.props.statesGeoJson.features != null
    const isViewingStreamDetailsAndNotExpanded = isExpanded === false

    const streamCentroidsGeoJson = isViewingStreamDetailsAndNotExpanded
      ? emptyArray
      : this.props.streamCentroidsGeoJson
    const isCloseButtonActive = this.props.isRootPage === false && this.props.isExpanded && isEmpty(this.props.selectedRegion) === false
    return (
      <div className={classes.container}>
        <div className={classes.backButtonContainer}>
          <ActionButtonComponent
            click={this.backButtonPressed}
            isActive={isCloseButtonActive}
          >
            <span className={`${classes.close} ${classes.black}`} />
          </ActionButtonComponent>
        </div>
        <div className={`${classes.minimapContent} ${expandClass}`} onClick={this.onSelectState}>
          {isMapMinimapLoaded && <SvgMapComponent
            statesGeoJson={this.props.statesGeoJson}
            countiesGeoJson={this.props.countiesGeoJson}
            regionsGeoJson={this.props.regionsGeoJson}
            streamCentroidsGeoJson={streamCentroidsGeoJson}
            getIsOpen={this.props.getIsOpen}
            selectedRegion={this.props.selectedRegion}
            selectedState={this.props.selectedState}
            selectedStreamCentroid={this.props.selectedStreamCentroid}
            width={MINIMAP_WIDTH}
            height={MINIMAP_WIDTH}
            isStreamCentroidsDisplayed={this.props.isStreamCentroidsDisplayed}
            selectRegion={this.selectRegion}
            cachedRegions={this.props.cachedRegions}
            isOffline={this.props.isOffline}
            currentGpsCoordinatesFeature={this.props.currentGpsCoordinatesFeature}
          />}
        </div>

      </div>
    )
  }
}

MinimapComponent.propTypes = {
  'isExpanded': PropTypes.bool.isRequired,
  'router': PropTypes.object.isRequired,
  'isRootPage': PropTypes.bool.isRequired,
  'statesGeoJson': PropTypes.object.isRequired,
  'countiesGeoJson': PropTypes.object.isRequired,
  'regionsGeoJson': PropTypes.object.isRequired,
  'streamCentroidsGeoJson': PropTypes.array,
  // TableOfContentsLoadingStatus: PropTypes.string.isRequired,
  'selectedState': PropTypes.object,
  'selectedRegion': PropTypes.object,
  'selectedStreamCentroid': PropTypes.object,
  'getIsOpen': PropTypes.func.isRequired,
  'isStreamCentroidsDisplayed': PropTypes.bool.isRequired,
  'cachedRegions': PropTypes.object.isRequired,
  'isOffline': PropTypes.bool.isRequired,
  'expand': PropTypes.func.isRequired,
  'fetchTableOfContents': PropTypes.func.isRequired,
  'currentGpsCoordinatesFeature': PropTypes.object,
}

const emptyArray = []
export default MinimapComponent
