import { connect } from 'react-redux'
import RegionLayout from './Region.layout'
import { fetchRegionData } from './Region.state'
import { visibleTroutStreams } from './Region.selectors'
import { selectedStateIdSelector, selectedRegionIdSelector, viewSelector } from 'ui/core/Core.selectors'
const mapDispatchToProps = {
  fetchRegionData: (stateId, regionId) => fetchRegionData(stateId, regionId)
  // loadCompany: (companyId) => fetchCompany(companyId)
}

const mapStateToProps = (state) => {
  let props = {
    view: viewSelector(state),
    troutStreams: visibleTroutStreams(state),
    selectedState: selectedStateIdSelector(state),
    selectedRegion: selectedRegionIdSelector(state)
  }

  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionLayout)
