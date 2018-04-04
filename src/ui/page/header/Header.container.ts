import { connect } from 'react-redux'
import { HeaderComponent, IHeaderStateProps, IHeaderStateDispatchProps } from './Header.component'
import { withRouter } from 'react-router'
import { IHeaderPassedProps } from './Header.component'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { setIsExpanded } from './minimap/Minimap.redux'
import { headerStatePropsSelector } from './Header.selectors'
import { addError } from 'ui/redux/Errors.redux'

const mapDispatchToProps = (dispatch): IHeaderStateDispatchProps => ({
  setIsExpanded: (isExpaned: boolean) => dispatch(setIsExpanded(isExpaned)),
  handleError: error => {
    // Flux Standard Actions get in the way here.
    // Just copy as a new object and walk away.
    const action = addError({ error: error || 'undefined error' })
    dispatch(action)
  },
})

const mapStateToProps = (state: IReduxState): IHeaderStateProps => headerStatePropsSelector(state)

const ConnectedHeaderContainer = connect<
  IHeaderStateProps,
  IHeaderStateDispatchProps,
  IHeaderPassedProps
>(mapStateToProps, mapDispatchToProps)(HeaderComponent)

export const HeaderContainer = withRouter(ConnectedHeaderContainer as any)
