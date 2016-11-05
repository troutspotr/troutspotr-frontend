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

  render () {
    let isFooterVisible = this.isFooterVisible()
    console.log(this.props)
    return (
      <div style={{ height: '100%' }}>
        <Header
          params={this.props.params}
          location={this.props.location} />
        <div className={classes.profileBody}>
          { this.props.children }
        </div>
        {isFooterVisible &&
          <Footer
            params={this.props.params}
            location={this.props.location} />}
      </div>
    )
  }
})

export default CoreLayoutContainer
