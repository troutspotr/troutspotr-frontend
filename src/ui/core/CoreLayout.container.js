import React from 'react'
import { connect } from 'react-redux'
import Header from './header/Header.container'
import classes from './CoreLayout.scss'
import Footer from './footer/Footer.container'
import SneezeGuardComponent from './sneezeGuard/SneezeGuard.component'
import AgreementComponent from './termsOfAgreement/Agreement.container'
import { isExpandedSelector } from './header/minimap/Minimap.selectors'
import { isExpaned as expandMinimap } from './header/minimap/Minimap.state'
import { REGION_PARAM_NAME, STATE_PARAM_NAME } from 'ui/core/RouteConstants.js'
import { hasAgreedToTermsSelector } from 'ui/core/Core.selectors.js'
import { isRootPageSelector, isStatePageSelector } from 'ui/Location.selectors'
import { withRouter } from 'react-router'
import NoResultsFoundOverlayContainer from './noResultsFoundOverlay/NoResultsFoundOverlay.container'
import AnonymousAnalyzerApi from 'api/AnonymousAnalyzerApi'
const CoreLayoutContainer = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
    params: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    isMinimapExpanded: React.PropTypes.bool.isRequired,
    isRoot: React.PropTypes.bool.isRequired,
    isState: React.PropTypes.bool.isRequired,
    hasAgreedToTerms: React.PropTypes.bool.isRequired,
    closeMinimap: React.PropTypes.func.isRequired
  },

  // only show the footer if they've selected a region.
  isFooterVisible () {
    let { params, hasAgreedToTerms } = this.props
    let isRegionDefined = params[REGION_PARAM_NAME] != null
    let isStateDefined = params[STATE_PARAM_NAME] != null

    return isRegionDefined && isStateDefined && hasAgreedToTerms
  },

  componentWillMount () {
    this.listenToRoutes()
  },

  listenToRoutes () {
    let { router } = this.props
    if (router == null) {
      console.log('No router found. Check Minimap component')
      return
    }

    router.listen(({ pathname }) => {
      AnonymousAnalyzerApi.recordEvent('page_navigation', {})
    })
  },

  render () {
    let isFooterVisible = this.isFooterVisible()
    return (
      <div className={classes.coreLayout}>
        {this.props.hasAgreedToTerms && <div className={classes.headerLayout}>
          <Header
            params={this.props.params}
            location={this.props.location} />
        </div>}
        {this.props.hasAgreedToTerms && <div className={classes.footerLayout}>
          {isFooterVisible &&
            <Footer
              params={this.props.params}
              location={this.props.location} />}
        </div>}
        <div id='scrollContainer' className={classes.coreContentLayout}>
          <div className={classes.coreContent}>
            <NoResultsFoundOverlayContainer />
            { this.props.children }
            {this.props.hasAgreedToTerms && this.props.isMinimapExpanded &&
              <SneezeGuardComponent close={this.props.isRoot || this.props.isState ? null : this.props.closeMinimap} />}
            {this.props.hasAgreedToTerms === false &&
              <AgreementComponent />}
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
    isState: isStatePageSelector(state),
    hasAgreedToTerms: hasAgreedToTermsSelector(state)
  }

  return props
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoreLayoutContainer))
