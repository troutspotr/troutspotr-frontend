import {connect} from 'react-redux'
import {getGpsCoordinateFeatureSelector,
  getIsActiveAndSuccessful,
  getIsGpsActiveButLoading,
  gpsCoordinatesLoadingStatusStateSelector,
  isGpsFailedSelector,
  isGpsTrackingActiveStateSelector,
  isGpsTrackingSupportedStateSelector} from 'ui/core/gps/Gps.selectors'
import {startGpsTracking, stopGpsTracking} from 'ui/core/gps/Gps.state'
import FooterGpsComponent from './Footer.gps.component'
const mapDispatchToProps = {
  'startGpsTracking': () => startGpsTracking(),
  'stopGpsTracking': () => stopGpsTracking(),
}

const mapStateToProps = (state) => {
  const props = {
    'isGpsTrackingSupported': isGpsTrackingSupportedStateSelector(state),
    'status': gpsCoordinatesLoadingStatusStateSelector(state),
    'isGpsTrackingActive': isGpsTrackingActiveStateSelector(state),
    'gpsCoordinateFeature': getGpsCoordinateFeatureSelector(state),
    'isGpsActiveButLoading': getIsGpsActiveButLoading(state),
    'isGpsActiveAndSuccessful': getIsActiveAndSuccessful(state),
    'isGpsFailed': isGpsFailedSelector(state),
  }
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterGpsComponent)
