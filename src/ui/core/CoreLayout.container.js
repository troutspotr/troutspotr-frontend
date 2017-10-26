import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Header from './header/Header.container'
import classes from './CoreLayout.scss'
import Footer from './footer/Footer.container'
import SneezeGuardComponent from './sneezeGuard/SneezeGuard.component'
import AgreementComponent from './termsOfAgreement/Agreement.container'
import {isExpandedSelector} from './header/minimap/Minimap.selectors'
import {isExpaned as expandMinimap} from './header/minimap/Minimap.state'
import {REGION_PARAM_NAME, STATE_PARAM_NAME} from 'ui/core/RouteConstants.js'
import {hasAgreedToTermsSelector} from 'ui/core/Core.selectors.js'
import {isRootPageSelector, isStatePageSelector} from 'ui/Location.selectors'
import {withRouter} from 'react-router'
import NoResultsFoundOverlayContainer from './noResultsFoundOverlay/NoResultsFoundOverlay.container'
import AnonymousAnalyzerApi from 'api/AnonymousAnalyzerApi'
import OfflineContainer from 'ui/core/offline/Offline.container'
class CoreLayoutContainer extends Component {
  // Only show the footer if they've selected a region.
  isFooterVisible () {
    const {params, hasAgreedToTerms} = this.props
    const isRegionDefined = params[REGION_PARAM_NAME] != null
    const isStateDefined = params[STATE_PARAM_NAME] != null

    return isRegionDefined && isStateDefined && hasAgreedToTerms
  }

  componentWillMount () {
    this.listenToRoutes()
  }

  listenToRoutes () {
    const {router} = this.props
    router.listen(({pathname}) => {
      AnonymousAnalyzerApi.recordEvent('page_navigation', {})
    })
  }

  render () {
    const isFooterVisible = this.isFooterVisible()
    return (
      <div className={classes.coreLayout}>
        <OfflineContainer />
        {this.props.hasAgreedToTerms && <div className={classes.headerLayout}>
          <Header
            params={this.props.params}
            location={this.props.location}
          />
        </div>}
        {this.props.hasAgreedToTerms && <div className={classes.footerLayout}>
          {isFooterVisible &&
            <Footer
              params={this.props.params}
              location={this.props.location}
            />}
        </div>}
        <div id="scrollContainer" className={classes.coreContentLayout}>
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
}

CoreLayoutContainer.propTypes = {
  'children': PropTypes.element.isRequired,
  'params': PropTypes.object.isRequired,
  'router': PropTypes.object.isRequired,
  'location': PropTypes.object.isRequired,
  'isMinimapExpanded': PropTypes.bool.isRequired,
  'isRoot': PropTypes.bool.isRequired,
  'isState': PropTypes.bool.isRequired,
  'hasAgreedToTerms': PropTypes.bool.isRequired,
  'closeMinimap': PropTypes.func.isRequired,
}

const mapDispatchToProps = {'closeMinimap': () => expandMinimap(false)}

const mapStateToProps = (state) => {
  const props = {
    'isMinimapExpanded': isExpandedSelector(state),
    'isRoot': isRootPageSelector(state),
    'isState': isStatePageSelector(state),
    'hasAgreedToTerms': hasAgreedToTermsSelector(state),
  }

  return props
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoreLayoutContainer))
