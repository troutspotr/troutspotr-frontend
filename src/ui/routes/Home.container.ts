import { connect } from 'react-redux'
import {
  PageLayoutComponent,
  IPageLayoutStateProps,
  IPageLayoutDispatchProps,
} from 'ui/page/PageLayout.component'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { fetchTableOfContents } from 'ui/core/Core.redux'
import { createStructuredSelector } from 'reselect'
import { themeSelector } from '../core/Core.selectors'
import { setIsExpanded } from '../page/header/minimap/Minimap.redux'
import { isExpandedSelector } from '../page/header/minimap/Minimap.selectors'

export const pageLayoutProps = createStructuredSelector<IReduxState, IPageLayoutStateProps>({
  theme: themeSelector,
  isExpanded: isExpandedSelector,
})

const mapStateToProps = (reduxState: IReduxState): IPageLayoutStateProps =>
  pageLayoutProps(reduxState)

const mapDispatchToProps: IPageLayoutDispatchProps = {
  fetchTableOfContents: () => fetchTableOfContents(),
  resetMinimap: () => setIsExpanded(false),
}

export const PageLayoutContainer = connect<IPageLayoutStateProps, IPageLayoutDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(PageLayoutComponent)
