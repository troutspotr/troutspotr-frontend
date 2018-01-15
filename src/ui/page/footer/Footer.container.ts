import { connect } from 'react-redux'
import { FooterComponent } from './Footer.component'
import { setViewToList, setViewToMap } from 'ui/core/Core.redux'
import { viewSelector } from 'ui/core//Core.selectors'
import { selectedStreamObjectSelector } from 'ui/routes/_state/_region/Region.selectors'
import {
  getGpsCoordinateFeatureSelector,
  getIsActiveAndSuccessful,
  getIsGpsActiveButLoading,
  gpsCoordinatesLoadingStatusStateSelector,
  isGpsFailedSelector,
  isGpsTrackingActiveStateSelector,
  isGpsTrackingSupportedStateSelector,
} from './gps/Gps.selectors'
import { startGpsTracking, stopGpsTracking } from './gps/Gps.redux'

export interface IFooterDispatchProps {
  setViewToMap: () => void
  setViewToList: () => void
  startGpsTracking: () => void
  stopGpsTracking: () => void
}

export interface IFooterStateProps {
  isGpsTrackingSupported: boolean
  isGpsActiveButLoading: boolean
  isGpsActiveAndSuccessful: boolean
  isGpsFailed: boolean
}

const mapDispatchToProps = (dispatch): IFooterDispatchProps => ({
  setViewToMap: () => dispatch(setViewToMap()),
  setViewToList: () => dispatch(setViewToList()),
  startGpsTracking: () => dispatch(startGpsTracking()),
  stopGpsTracking: () => dispatch(stopGpsTracking()),
})

const mapStateToProps = (state): IFooterStateProps => {
  const props = {
    isGpsTrackingSupported: isGpsTrackingSupportedStateSelector(state),
    status: gpsCoordinatesLoadingStatusStateSelector(state),
    isGpsTrackingActive: isGpsTrackingActiveStateSelector(state),
    gpsCoordinateFeature: getGpsCoordinateFeatureSelector(state),
    isGpsActiveButLoading: getIsGpsActiveButLoading(state),
    isGpsActiveAndSuccessful: getIsActiveAndSuccessful(state),
    isGpsFailed: isGpsFailedSelector(state),
    view: viewSelector(state),
    selectedStream: selectedStreamObjectSelector(state),
  }

  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterComponent)
