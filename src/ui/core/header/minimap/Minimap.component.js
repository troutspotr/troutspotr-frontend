import React, { PropTypes } from 'react'
import classes from './Minimap.scss'
import { isRootPageByUrl, isStatePageByUrl } from 'ui/Location.selectors'
import debounce from 'lodash/debounce'
import SvgMapComponent from './svgMinimap/SvgMap.component'
import ActionButtonComponent from '../actionButton/ActionButton.component'
import { isEmpty } from 'lodash'
import { browserHistory } from 'react-router'
const MINIMAP_WIDTH = 50

const MinimapComponent = React.createClass({
  propTypes: {
    isExpanded: PropTypes.bool.isRequired,
    router: PropTypes.object.isRequired,
    isRootPage: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    statesGeoJson: PropTypes.object.isRequired,
    countiesGeoJson: PropTypes.object.isRequired,
    regionsGeoJson: PropTypes.object.isRequired,
    streamCentroidsGeoJson: PropTypes.array,
    tableOfContentsLoadingStatus: PropTypes.string.isRequired,
    selectedState: PropTypes.object,
    selectedRegion: PropTypes.object,
    selectedStreamCentroid: PropTypes.object,
    getIsOpen: PropTypes.func.isRequired,
    expand: PropTypes.func.isRequired,
    fetchTableOfContents: PropTypes.func.isRequired
  },

  componentWillMount () {
    this.props.fetchTableOfContents()
    if (window) {
      this.debouncedResizeEvent = debounce(this.resizeEvent, 200)
      window.addEventListener('resize', this.debouncedResizeEvent)
      window.addEventListener('orientationchange', this.debouncedResizeEvent)
    }

    this.listenToRoutes()
  },

  listenToRoutes () {
    let { router } = this.props
    if (router == null) {
      console.log('No router found. Check Minimap component')
      return
    }

    router.listen(({ pathname }) => {
      if (isRootPageByUrl(pathname) || isStatePageByUrl(pathname)) {
        this.props.expand(true)
        return
      }

      this.props.expand(false)
    })
  },

  shouldComponentUpdate (nextProps) {
    if (nextProps.isExpanded !== this.props.isExpanded) {
      return true
    }

    if (nextProps.selectedState !== this.props.selectedState) {
      return true
    }

    if (nextProps.selectedRegion !== this.props.selectedRegion) {
      return true
    }

    if (nextProps.tableOfContentsLoadingStatus !== this.props.tableOfContentsLoadingStatus) {
      return true
    }

    if (nextProps.isExpanded && nextProps.streamCentroidsGeoJson !== this.props.streamCentroidsGeoJson) {
      return true
    }

    if (nextProps.selectedStreamCentroid !== this.props.selectedStreamCentroid) {
      return true
    }

    return false
  },

  componentDidMount () {
    setTimeout(this.resizeEvent, 20)
  },

  componentWillUnmount () {
    if (window) {
      window.removeEventListener('resize', this.debouncedResizeEvent)
      window.removeEventListener('orientationchange', this.debouncedResizeEvent)
    }
  },

  getCSSRule (ruleName, deleteFlag) {
    ruleName = ruleName.toLowerCase()
    if (document.styleSheets) {
      for (var i = 0; i < document.styleSheets.length; i++) {
        var styleSheet = document.styleSheets[i]
        var ii = 0
        var cssRule = false
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
              } else {
                return cssRule
              }
            }
          }
          ii++
        } while (cssRule)
      }
    }
    return false
  },

  resizeEvent () {
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width
    let height = (window.innerHeight > 0) ? window.innerHeight : screen.height

    let minimumDimension = Math.min(width, height - 120)
    let ratio = minimumDimension / MINIMAP_WIDTH
    let soughtClassRule = `.${classes.minimapContent}.${classes.expand}`

    let result = this.getCSSRule(soughtClassRule)
    let translateY = MINIMAP_WIDTH + 15
    let translateX = (width - (ratio * MINIMAP_WIDTH)) / 2
    let newStyle = `translateY(${Math.round(translateY)}px) translateX(${-Math.round(translateX)}px) scale(${ratio})`

    result.style.transform = newStyle
  },

  onSelectState (e) {
    let isNoRegionSelected = isEmpty(this.props.selectedRegion)
    if (this.props.isRootPage || isNoRegionSelected) {
      return
    }

    this.props.expand(!this.props.isExpanded)
  },

  selectRegion (e, region) {
    let shouldRespond = this.props.isExpanded

    // do not respond to clicks when not expanded
    if (shouldRespond === false) {
      e.preventDefault()
      return false
    }

    e.stopPropagation()
    this.props.expand(false)

    let stateName = 'mn' // hail mary
    let path = `/${stateName}/${region.properties.name.toLowerCase()}`
    browserHistory.push(path)
  },

  backButtonPressed () {
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
  },

  render () {
    let { isExpanded } = this.props
    let expandClass = isExpanded ? classes.expand : null
    let isMapMinimapLoaded = this.props.statesGeoJson != null && this.props.statesGeoJson.features != null
    let isViewingStreamDetailsAndNotExpanded = isExpanded === false

    let streamCentroidsGeoJson = isViewingStreamDetailsAndNotExpanded
      ? emptyArray
      : this.props.streamCentroidsGeoJson
    let isCloseButtonActive = this.props.isRootPage === false && this.props.isExpanded && isEmpty(this.props.selectedRegion) === false
    return (
      <div className={classes.container}>
        <div className={classes.backButtonContainer}>
          <ActionButtonComponent
            click={this.backButtonPressed}
            isActive={isCloseButtonActive} >
            <span className={classes.close + ' ' + classes.black} />
          </ActionButtonComponent>
        </div>
        <div className={classes.minimapContent + ' ' + expandClass} onClick={this.onSelectState}>
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
            selectRegion={this.selectRegion} />}
        </div>

      </div>
    )
  }
})
const emptyArray = []
export default MinimapComponent
