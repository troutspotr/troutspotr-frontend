import { connect } from 'react-redux'
import { viewSelector } from 'ui/core//Core.selectors'
import { setViewToList, setViewToMap } from 'ui/core/Core.redux'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { selectedStreamObjectSelector } from 'ui/routes/@usState/@region/Region.selectors'
import { FooterComponent, IFooterStateProps } from './Footer.component'
import { startGpsTracking, stopGpsTracking } from '../../core/gps/Gps.redux'
import {
  isGpsTrackingSupportedStateSelector,
  getIsGpsActiveButLoading,
  getIsActiveAndSuccessful,
  isGpsFailedSelector,
} from '../../core/gps/Gps.selectors'

export interface IFooterDispatchProps {
  setViewToMap(): void
  setViewToList(): void
  startGpsTracking(): void
  stopGpsTracking(): void
}

const mapDispatchToProps = (dispatch): IFooterDispatchProps => ({
  setViewToMap: () => dispatch(setViewToMap(null)),
  setViewToList: () => dispatch(setViewToList(null)),
  startGpsTracking: () => dispatch(startGpsTracking()),
  stopGpsTracking: () => dispatch(stopGpsTracking()),
})

const mapStateToProps = (reduxState: IReduxState): IFooterStateProps => {
  const props: IFooterStateProps = {
    isGpsTrackingSupported: isGpsTrackingSupportedStateSelector(reduxState),
    isGpsActiveButLoading: getIsGpsActiveButLoading(reduxState),
    isGpsActiveAndSuccessful: getIsActiveAndSuccessful(reduxState),
    isGpsFailed: isGpsFailedSelector(reduxState),
    view: viewSelector(reduxState),
    selectedStream: selectedStreamObjectSelector(reduxState),
  }

  return props
}

export const FooterContainer = connect(mapStateToProps, mapDispatchToProps)(FooterComponent)
