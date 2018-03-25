import { connect } from 'react-redux'
import {
  PageLayoutComponent,
  IPageLayoutStateProps,
  IPageLayoutDispatchProps,
} from 'ui/page/PageLayout.component'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { fetchTableOfContents } from 'ui/core/Core.redux'

const mapStateToProps = (reduxState: IReduxState): IPageLayoutStateProps => {
  return {}
}

const mapDispatchToProps: IPageLayoutDispatchProps = {
  fetchTableOfContents: () => fetchTableOfContents(),
}

export const PageLayoutContainer = connect<IPageLayoutStateProps, IPageLayoutDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(PageLayoutComponent)
