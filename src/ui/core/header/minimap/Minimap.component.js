import React from 'react'
import classes from './Minimap.scss'
import headerClasses from '../Header.scss'
import kirby from './kirby.gif'
import ExampleSvg from './ExampleMinnesota.svg'
const MINIMAP_WIDTH = 50
const MinimapComponent = React.createClass({
  propTypes: {
  },

  componentWillMount () {
    console.log('component mounted')
    if (window) {
      window.addEventListener('resize', this.resizeEvent)
      window.addEventListener('orientationchange', this.resizeEvent)
    }
  },

  componentDidMount () {
    setTimeout(this.resizeEvent, 100)
    // this.resizeEvent()
  },

  componentWillUnmount () {
    console.log('component unmounted')
    if (window) {
      window.removeEventListener('resize', this.resizeEvent)
      window.removeEventListener('orientationchange', this.resizeEvent)
    }
  },

  getCSSRule(ruleName, deleteFlag) {               // Return requested style obejct
   ruleName=ruleName.toLowerCase()                      // Convert test string to lower case.
   if (document.styleSheets) {                            // If browser can play with stylesheets
      for (var i=0; i<document.styleSheets.length; i++) { // For each stylesheet
         var styleSheet=document.styleSheets[i];          // Get the current Stylesheet
         var ii=0;                                        // Initialize subCounter.
         var cssRule=false;                               // Initialize cssRule. 
         do {                                             // For each rule in stylesheet
            if (styleSheet.cssRules) {                    // Browser uses cssRules?
               cssRule = styleSheet.cssRules[ii];         // Yes --Mozilla Style
            } else {                                      // Browser usses rules?
               cssRule = styleSheet.rules[ii];            // Yes IE style. 
            }                                             // End IE check.
            if (cssRule && cssRule.selectorText != null)  {                               // If we found a rule...
               if (cssRule.selectorText.toLowerCase()==ruleName) { //  match ruleName?
                  if (deleteFlag=='delete') {             // Yes.  Are we deleteing?
                     if (styleSheet.cssRules) {           // Yes, deleting...
                        styleSheet.deleteRule(ii);        // Delete rule, Moz Style
                     } else {                             // Still deleting.
                        styleSheet.removeRule(ii);        // Delete rule IE style.
                     }                                    // End IE check.
                     return true;                         // return true, class deleted.
                  } else {                                // found and not deleting.
                     return cssRule;                      // return the style object.
                  }                                       // End delete Check
               }                                          // End found rule name
            }                                             // end found cssRule
            ii++;                                         // Increment sub-counter
         } while (cssRule)                                // end While loop
      }                                                   // end For loop
   }                                                      // end styleSheet ability check
   return false;                                          // we found NOTHING!
  },

  resizeEvent () {
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width
    let height = (window.innerHeight > 0) ? window.innerHeight : screen.height

    let minimumDimension = Math.min(width, height - 60)
    let ratio = minimumDimension / MINIMAP_WIDTH
    console.log(ratio)
    console.log(headerClasses.minimap)
    let result = this.getCSSRule('.' + headerClasses.minimap + ':hover')
    console.log(result)

    result.style.transform = `translateY(${MINIMAP_WIDTH + 5}px) scale(${ratio})`
  },
  // let regionId = this.props.params.regionId || null;

  render () {
    console.log('classes', classes)
    return (
      <div>
        <img src={kirby} />
        <span className={classes.tl}><button>tl</button></span>
        <span className={classes.tr}><button>tr</button></span>
        <span className={classes.bl}><button>bl</button></span>
        <span className={classes.br}><button>br</button></span>
      </div>
    )
  }
})
export default MinimapComponent
