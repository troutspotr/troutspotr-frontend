import { connect } from 'react-redux'
import { selectedRegionIdSelector } from 'ui/core/Core.selectors'
import { getGpsCoordinateFeatureSelector } from 'ui/page/footer/gps/Gps.selectors'
import MapboxGlComponent from './MapboxGl.component'
import { getLayerPackage } from './MapboxGl.selectors.layerPackage'
import { getMapboxGlSources } from './sources/Source.selectors'

const mapDispatchToProps = {}

const mapStateToProps = state => {
  const props = {
    sources: getMapboxGlSources(state),
    layerPackage: getLayerPackage(state),
    selectedRegionId: selectedRegionIdSelector(state),
    gpsLocation: getGpsCoordinateFeatureSelector(state),
  }
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(MapboxGlComponent)
