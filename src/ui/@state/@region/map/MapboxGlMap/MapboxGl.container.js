import {connect} from 'react-redux'
import MapboxGlComponent from './MapboxGl.component'
import {getMapboxGlSources} from './sources/Source.selectors'
import {getLayerPackage} from './MapboxGl.selectors.layerPackage'
import {selectedRegionIdSelector} from 'ui/core/Core.selectors'
import {getGpsCoordinateFeatureSelector} from 'ui/core/gps/Gps.selectors'

const mapDispatchToProps = {}

const mapStateToProps = (state) => {
  const props = {
    'sources': getMapboxGlSources(state),
    'layerPackage': getLayerPackage(state),
    'selectedRegionId': selectedRegionIdSelector(state),
    'gpsLocation': getGpsCoordinateFeatureSelector(state),
  }
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(MapboxGlComponent)
