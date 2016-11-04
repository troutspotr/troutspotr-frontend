import React, { PropTypes } from 'react'
import classes from './Minimap.scss'
import headerClasses from '../Header.scss'
import kirby from './kirby.gif'
import { isRootPageByUrl } from 'ui/Location.selectors'
import { Link } from 'react-router'
// import ExampleSvg from './ExampleMinnesota.svg'
const MINIMAP_WIDTH = 50
const MinimapComponent = React.createClass({
  propTypes: {
    isExpanded: PropTypes.bool.isRequired,
    router: PropTypes.object.isRequired,
    isRootPage: PropTypes.bool.isRequired,

    expand: PropTypes.func.isRequired
  },

  componentWillMount () {
    if (window) {
      window.addEventListener('resize', this.resizeEvent)
      window.addEventListener('orientationchange', this.resizeEvent)
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
    setTimeout(this.resizeEvent, 100)
  },

  componentWillUnmount () {
    if (window) {
      window.removeEventListener('resize', this.resizeEvent)
      window.removeEventListener('orientationchange', this.resizeEvent)
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

    let minimumDimension = Math.min(width, height - 60)
    let ratio = minimumDimension / MINIMAP_WIDTH
    // console.log(ratio)
    // console.log(headerClasses.minimap)
    let soughtClassRule = `.${classes.minimapContent}.${classes.expand}`

    let result = this.getCSSRule(soughtClassRule)
    // console.log(soughtClassRule, result)
    result.style.transform = `translateY(${MINIMAP_WIDTH + 5}px) scale(${ratio})`
  },

  onSelectState (e) {
    // console.log('state selected')
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

  render () {
    let { isExpanded } = this.props
    let expandClass = isExpanded ? classes.expand : null
    // console.log(isExpanded, expandClass)
    return (
      <div className={classes.minimapContent + ' ' + expandClass} onClick={this.onSelectState}>
        <img src={kirby} />
        <span className={classes.tl}>
          <Link to={'/mn/driftless'} onClick={this.selectRegion}>tl</Link>
        </span>
        <span className={classes.tr}>
          <Link to={'/mn/driftless'} onClick={this.selectRegion}>tr</Link>
        </span>
        <span className={classes.bl}>
          <Link to={'/mn/driftless'} onClick={this.selectRegion}>bl</Link>
        </span>
        <span className={classes.br}>
          <Link to={'/mn/driftless'} onClick={this.selectRegion}>br</Link>
        </span>
      </div>
    )
  }
})
export default MinimapComponent
