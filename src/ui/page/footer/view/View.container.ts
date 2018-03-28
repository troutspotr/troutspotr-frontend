import { connect } from 'react-redux'
import {
  SwitchComponent,
  ISwitchComponentStateProps,
  ISwitchDispatchProps,
} from '../switch/Switch.component'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { viewPropsSelector } from './View.selectors'
import { setViewToMap, setViewToList } from 'ui/core/Core.redux'

export const mapStateToProps = (reduxState: IReduxState): ISwitchComponentStateProps => {
  return viewPropsSelector(reduxState)
}

const mapDispatchToProps = (dispatch): ISwitchDispatchProps => ({
  startTracking: () => dispatch(setViewToMap(true)),
  stopTracking: () => dispatch(setViewToList(true)),
})

export const ViewContainer = connect(mapStateToProps, mapDispatchToProps)(SwitchComponent)
