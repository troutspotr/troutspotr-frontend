import { connect } from 'react-redux'
import {
  MinimapComponent,
  IMinimapStateProps,
  IMinimapDispatchProps,
  IMinimapPassedProps,
} from './Minimap.component'
import { setIsExpanded } from './Minimap.redux'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { isExpandedSelector } from './Minimap.selectors'

const mapDispatchToProps: IMinimapDispatchProps = {
  handleExpand: expanded => setIsExpanded(expanded),
}

const mapStateToProps = (state: IReduxState): IMinimapStateProps => {
  const props = {
    isExpanded: isExpandedSelector(state),
    isReadyToReveal: true,
  }
  return props
}

export const MinimapContainer = connect<
  IMinimapStateProps,
  IMinimapDispatchProps,
  IMinimapPassedProps
>(mapStateToProps, mapDispatchToProps)(MinimapComponent)
