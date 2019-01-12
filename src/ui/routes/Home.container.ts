import { connect } from 'react-redux'

import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { fetchTableOfContents } from 'ui/core/Core.redux'
import { createStructuredSelector } from 'reselect'
import { themeSelector } from '../core/Core.selectors'
import { setIsExpanded } from '../page/header/minimap/Minimap.redux'
import { isBackgroundBlurredSelector } from '../page/header/minimap/Minimap.selectors'
import { addError } from '../redux/Errors.redux'
import { IPageLayoutStateProps, IPageLayoutDispatchProps } from '../page/IPageLayout'
import { PageLayoutComponent } from 'ui/page/PageLayout.component'
import { hasAgreedToTermsStateSelector } from 'ui/routes/legal/Legal.selectors';

export const pageLayoutProps = createStructuredSelector<IReduxState, IPageLayoutStateProps>({
  theme: themeSelector,
  isExpanded: isBackgroundBlurredSelector,
  hasAgreedToTerms: hasAgreedToTermsStateSelector,
})

export const homeComponentMapStateToProps = (reduxState: IReduxState): IPageLayoutStateProps =>
  pageLayoutProps(reduxState)

export const homeContainerMapDispatchToProps: IPageLayoutDispatchProps = {
  handleError: error => {
    // Flux Standard Actions get in the way here.
    // Just copy as a new object and walk away.
    const action = addError({ error: error || 'undefined error' })
    return action
  },
  fetchTableOfContents: () => fetchTableOfContents(),
  resetMinimap: () => setIsExpanded(false),
}

export const PageLayoutContainer = connect<IPageLayoutStateProps, IPageLayoutDispatchProps>(
  homeComponentMapStateToProps,
  homeContainerMapDispatchToProps
)(PageLayoutComponent)
