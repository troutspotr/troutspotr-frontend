import React from 'react'
import Header from './header/Header.container'
import classes from './CoreLayout.scss'
import Footer from './footer/Footer.container'
import { REGION_PARAM_NAME, STATE_PARAM_NAME } from 'ui/core/RouteConstants.js'

const CoreLayoutContainer = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
    params: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired
  },

  // only show the footer if they've selected a region.
  isFooterVisible () {
    let { params } = this.props
    let isRegionDefined = params[REGION_PARAM_NAME] != null
    let isStateDefined = params[STATE_PARAM_NAME] != null

    return isRegionDefined && isStateDefined
  },

  renderDebugContainer () {
    return (<div className={classes.debug}>
      <span className={classes.tl}>
        top-left
      </span>
      <span className={classes.tr}>
        top-right
      </span>
      <span className={classes.bl}>
        bottom-left
      </span>
      <span className={classes.br}>
        bottom-right
      </span>
    </div>)
  },

  render () {
    let isFooterVisible = this.isFooterVisible()
    console.log(this.props)
    return (
      <div className={classes.coreLayout}>
        <div className={classes.headerLayout}>
          {true && <Header
            params={this.props.params}
            location={this.props.location} />}
        </div>
        <div className={classes.coreContentLayout}>
          {this.renderDebugContainer()}
          <div className={classes.coreContent}>
            { this.props.children }
          </div>
        </div>
        <div className={classes.footerLayout}>
          {isFooterVisible &&
            <Footer
              params={this.props.params}
              location={this.props.location} />}
        </div>
      </div>
    )
  }
})

export default CoreLayoutContainer
