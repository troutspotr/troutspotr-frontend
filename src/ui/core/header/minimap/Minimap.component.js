import React, { PropTypes } from 'react'
import classes from './Minimap.scss'
import headerClasses from '../Header.scss'
import kirby from './kirby.gif'
import { isRootPageByUrl } from 'ui/Location.selectors'
import { Link } from 'react-router'
import debounce from 'lodash/debounce'
const MINIMAP_WIDTH = 50
const REGION_INDEX = 2
const STATE_INDEX = 1
const MinimapComponent = React.createClass({
  propTypes: {
    isExpanded: PropTypes.bool.isRequired,
    router: PropTypes.object.isRequired,
    isRootPage: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,

    expand: PropTypes.func.isRequired
  },

  componentWillMount () {
    if (window) {
      this.debouncedResizeEvent = debounce(this.resizeEvent, 500)
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
      if (isRootPageByUrl(pathname)) {
        this.props.expand(true)
        return
      }

      this.props.expand(false)
    })
  },

  componentDidMount () {
    setTimeout(this.resizeEvent, 500)
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
    console.log('finished resetting style for scale')
  },

  onSelectState (e) {
    if (this.props.isRootPage) {
      return
    }

    this.props.expand(!this.props.isExpanded)
  },

  selectRegion (e) {
    let shouldRespond = this.props.isExpanded

    // do not response to clicks when not expanded
    if (shouldRespond === false) {
      return
    }

    e.stopPropagation()
    this.props.expand(false)
  },

  // take a url like '/mn/driftless/map/123'
  // and swap out region like '/mn/YOUR_REGION/map/123'
  swapRegion ({ pathname }, newRegion) {
    let stateId = 'mn'
    if (pathname == null) {
      return '/'
    }

    if (pathname === '/') {
      return `/${stateId}/${newRegion}`
    }

    let tokens = pathname.split('/')
    tokens[REGION_INDEX] = newRegion
    tokens[STATE_INDEX] = stateId
    let locationIsTooLong = tokens.length > 4
    if (locationIsTooLong) {
      // turn '/mn/myRegion/map/123123123123'
      // into '/mn/myRegion/map'
      tokens = tokens.slice(0, 4)
    }
    let newUrl = `${tokens.join('/')}`
    return newUrl
  },

  renderSneezeGuard () {
    return (<div className={classes.sneezeGuard}>
          Sneeze Guard
        </div>)
  },

  render () {
    let { isExpanded, location } = this.props
    let expandClass = isExpanded ? classes.expand : null
    console.log('rendering minimap')
    // console.log(isExpanded, expandClass)
    return (
      <div className={classes.minimapContent + ' ' + expandClass} onClick={this.onSelectState}>
        <img src={kirby} />
        <span className={classes.tl}>
          <Link to={this.swapRegion(location, 'tl')} onClick={this.selectRegion}>tl</Link>
        </span>
        <span className={classes.tr}>
          <Link to={this.swapRegion(location, 'tr')} onClick={this.selectRegion}>tr</Link>
        </span>
        <span className={classes.bl}>
          <Link to={this.swapRegion(location, 'bl')} onClick={this.selectRegion}>bl</Link>
        </span>
        <span className={classes.br}>
          <Link to={this.swapRegion(location, 'br')} onClick={this.selectRegion}>br</Link>
        </span>
      </div>
    )
  }
})
export default MinimapComponent
