import { connect } from 'react-redux'
import MapboxGlComponent from './MapboxGl.component'
import { getMapboxGlSources } from './sources/Source.selectors'
import { getLayerPackage } from './MapboxGl.selectors.layerPackage'
import { selectedRegionIdSelector } from 'ui/core/Core.selectors'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => {
  let props = {
    sources: getMapboxGlSources(state),
    layerPackage: getLayerPackage(state),
    selectedRegionId: selectedRegionIdSelector(state)
  }
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(MapboxGlComponent)
