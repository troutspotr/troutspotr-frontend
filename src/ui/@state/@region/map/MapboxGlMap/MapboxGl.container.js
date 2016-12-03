import { connect } from 'react-redux'
import MapboxGlComponent from './MapboxGl.component'
// import * as region from 'ui/@state/@region/Region.selectors'
// import * as sourceLayerSelectors from './MapboxGl.selectors.source'
import { getMapboxGlSources } from './sources/Source.selectors'
import { getLayerPackage } from './MapboxGl.selectors.layerPackage'
import { selectedRegionIdSelector } from 'ui/core/Core.selectors'
// import { getStreamFilters } from './filters/Filters.selectors'
// import { layersSelector } from './styles/Style.selectors'

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
