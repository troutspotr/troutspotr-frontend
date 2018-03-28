import { connect } from 'react-redux'
import { HeaderComponent, IHeaderStateProps, IHeaderStateDispatchProps } from './Header.component'
import { withRouter } from 'react-router'
import { IHeaderPassedProps } from './Header.component'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { setIsExpanded } from './minimap/Minimap.redux'
import { headerStatePropsSelector } from './Header.selectors'

const mapDispatchToProps = (dispatch): IHeaderStateDispatchProps => ({
  setIsExpanded: (isExpaned: boolean) => dispatch(setIsExpanded(isExpaned)),
})

const mapStateToProps = (state: IReduxState): IHeaderStateProps => headerStatePropsSelector(state)

const ConnectedHeaderContainer = connect<
  IHeaderStateProps,
  IHeaderStateDispatchProps,
  IHeaderPassedProps
>(mapStateToProps, mapDispatchToProps)(HeaderComponent)

export const HeaderContainer = withRouter(ConnectedHeaderContainer as any)
