import { connect } from 'react-redux'
import MicroMapGpsComponent from './MicroMap.gps.component'
import { isListVisible } from 'ui/core/Core.selectors'
import { getGpsCoordinateFeatureSelector, getIsActiveAndSuccessful } from 'ui/core/gps/Gps.selectors'
const mapDispatchToProps = {
}

const mapStateToProps = (state) => {
  let props = {
    isVisible: isListVisible(state),
    gpsCoordinates: getGpsCoordinateFeatureSelector(state),
    isGpsActive: getIsActiveAndSuccessful(state)
  }
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(MicroMapGpsComponent)
