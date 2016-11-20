import React, { PropTypes } from 'react'
import classes from './Minimap.scss'
import { isRootPageByUrl } from 'ui/Location.selectors'
import debounce from 'lodash/debounce'
import SvgMapComponent from './svgMinimap/SvgMap.component'

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

    expand: PropTypes.func.isRequired,
    fetchTableOfContents: PropTypes.func.isRequired
  },

  componentWillMount () {
    console.log('fetch!')
    this.props.fetchTableOfContents()
    if (window) {
      this.debouncedResizeEvent = debounce(this.resizeEvent, 1000)
      window.addEventListener('resize', this.debouncedResizeEvent)
      window.addEventListener('orientationchange', this.debouncedResizeEvent)
    }

    this.listenToRoutes()
    setInterval(() => {
      console.log(this.props.isExpanded)
      this.props.expand(this.props.isExpanded === false)
    }, 600)
  },

  listenToRoutes () {
    let { router } = this.props
    if (router == null) {
      console.log('No router found. Check Minimap component')
      return
    }

    router.listen(({ pathname }) => {
      if (isRootPageByUrl(pathname)) {
        this.props.expand(true)
        return
      }

      this.props.expand(false)
    })
  },

  componentDidMount () {
    setTimeout(this.resizeEvent, 1000)
  },

  componentWillUnmount () {
    if (window) {
      window.removeEventListener('resize', this.debouncedResizeEvent)
      window.removeEventListener('orientationchange', this.debouncedResizeEvent)
    }
  },

  getCSSRule (ruleName, deleteFlag) {               // Return requested style obejct
    ruleName = ruleName.toLowerCase()                      // Convert test string to lower case.
    if (document.styleSheets) {                            // If browser can play with stylesheets
      for (var i = 0; i < document.styleSheets.length; i++) { // For each stylesheet
        var styleSheet = document.styleSheets[i]          // Get the current Stylesheet
        var ii = 0                                        // Initialize subCounter.
        var cssRule = false                               // Initialize cssRule.
        do {                                             // For each rule in stylesheet
          if (styleSheet.cssRules) {                    // Browser uses cssRules?
            cssRule = styleSheet.cssRules[ii]         // Yes --Mozilla Style
          } else {                                      // Browser usses rules?
            cssRule = styleSheet.rules[ii]            // Yes IE style.
          }                                             // End IE check.
          if (cssRule && cssRule.selectorText != null) {                               // If we found a rule...
            if (cssRule.selectorText.toLowerCase() === ruleName) { //  match ruleName?
              if (deleteFlag === 'delete') {             // Yes.  Are we deleteing?
                if (styleSheet.cssRules) {           // Yes, deleting...
                  styleSheet.deleteRule(ii)        // Delete rule, Moz Style
                } else {                             // Still deleting.
                  styleSheet.removeRule(ii)        // Delete rule IE style.
                }                                    // End IE check.
                return true                         // return true, class deleted.
              } else {                                // found and not deleting.
                return cssRule                      // return the style object.
              }                                       // End delete Check
            }                                          // End found rule name
          }                                             // end found cssRule
          ii++                                         // Increment sub-counter
        } while (cssRule)                                // end While loop
      }                                                   // end For loop
    }                                                      // end styleSheet ability check
    return false                                          // we found NOTHING!
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
    let newStyle = `translateY(${translateY}px) translateX(${-translateX}px) scale(${ratio})`

    result.style.transform = newStyle
    // console.log('finished resetting style for scale')
  },

  onSelectState (e) {
    if (this.props.isRootPage) {
      return
    }

    this.props.expand(!this.props.isExpanded)
  },

  selectRegion (e, region) {
    let shouldRespond = this.props.isExpanded

    // do not response to clicks when not expanded
    if (shouldRespond === false) {
      e.preventDefault()
      return false
    }

    e.stopPropagation()
    this.props.expand(false)
  },

  render () {
    console.log('render minimap')
    let { isExpanded, selectedStreamCentroid } = this.props
    let expandClass = isExpanded ? classes.expand : null
    let isMapMinimapLoaded = this.props.statesGeoJson != null && this.props.statesGeoJson.features != null
    let isViewingStreamDetailsAndNotExpanded = selectedStreamCentroid != null && isExpanded === false

    let streamCentroidsGeoJson = isViewingStreamDetailsAndNotExpanded
      ? emptyArray
      : this.props.streamCentroidsGeoJson
    return (
      <div className={classes.minimapContent + ' ' + expandClass} onClick={this.onSelectState}>
        {isMapMinimapLoaded && <SvgMapComponent
          statesGeoJson={this.props.statesGeoJson}
          countiesGeoJson={this.props.countiesGeoJson}
          regionsGeoJson={this.props.regionsGeoJson}
          streamCentroidsGeoJson={streamCentroidsGeoJson}
          selectedRegion={this.props.selectedRegion}
          selectedState={this.props.selectedState}
          selectedStreamCentroid={this.props.selectedStreamCentroid}
          width={MINIMAP_WIDTH}
          height={MINIMAP_WIDTH}
          selectRegion={this.selectRegion} />}
      </div>
    )
  }
})
const emptyArray = []
export default MinimapComponent
