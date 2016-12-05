import React from 'react'
import { connect } from 'react-redux'
import Header from './header/Header.container'
import classes from './CoreLayout.scss'
import Footer from './footer/Footer.container'
import SneezeGuardComponent from './sneezeGuard/SneezeGuard.component'
import { isExpandedSelector } from './header/minimap/Minimap.selectors'
import { isExpaned as expandMinimap } from './header/minimap/Minimap.state'
import { REGION_PARAM_NAME, STATE_PARAM_NAME } from 'ui/core/RouteConstants.js'
import { isRootPageSelector, isStatePageSelector } from 'ui/Location.selectors'

const CoreLayoutContainer = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
    params: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    isMinimapExpanded: React.PropTypes.bool.isRequired,
    isRoot: React.PropTypes.bool.isRequired,
    isState: React.PropTypes.bool.isRequired,
    closeMinimap: React.PropTypes.func.isRequired
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
    // console.log(this.props)
    return (
      <div className={classes.coreLayout}>
        <div className={classes.headerLayout}>
          {true && <Header
            params={this.props.params}
            location={this.props.location} />}
        </div>
        <div className={classes.footerLayout}>
          {isFooterVisible &&
            <Footer
              params={this.props.params}
              location={this.props.location} />}
        </div>
        <div className={classes.coreContentLayout}>
          <div className={classes.coreContent}>
            { this.props.children }
            {this.props.isMinimapExpanded &&
              <SneezeGuardComponent close={this.props.isRoot || this.props.isState ? null : this.props.closeMinimap} />}
          </div>
        </div>

      </div>
    )
  }
})

const mapDispatchToProps = {
  closeMinimap: () => expandMinimap(false)
}

const mapStateToProps = (state) => {
  let props = {
    isMinimapExpanded: isExpandedSelector(state),
    isRoot: isRootPageSelector(state),
    isState: isStatePageSelector(state)
  }

  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayoutContainer)

// export default CoreLayoutContainer
