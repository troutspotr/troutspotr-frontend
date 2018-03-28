import { connect } from 'react-redux'
import {
  SwitchComponent,
  ISwitchComponentStateProps,
  ISwitchDispatchProps,
} from '../switch/Switch.component'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { startGpsTracking, stopGpsTracking } from 'ui/core/gps/Gps.redux'
import { gpsPropsSelector } from './Gps.selectors'

export const mapStateToProps = (reduxState: IReduxState): ISwitchComponentStateProps => {
  return gpsPropsSelector(reduxState)
}

const mapDispatchToProps = (dispatch): ISwitchDispatchProps => ({
  startTracking: () => dispatch(startGpsTracking()),
  stopTracking: () => dispatch(stopGpsTracking()),
})

export const GpsContainer = connect(mapStateToProps, mapDispatchToProps)(SwitchComponent)
