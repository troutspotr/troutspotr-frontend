import { connect } from 'react-redux'
import RegionLayout from './Region.layout'
import { fetchRegionData } from './Region.state'
import { visibleTroutStreams,
  regionLoadingStatusSelector,
  showNoResultsFoundSelector,
  streamsSelector } from './Region.selectors'
import { selectedStateIdSelector,
  selectedRegionIdSelector,
  viewSelector } from 'ui/core/Core.selectors'
import { updateSearchText } from 'ui/core/Core.state'

const mapDispatchToProps = {
  fetchRegionData: (stateId, regionId) => fetchRegionData(stateId, regionId),
  clearText: () => updateSearchText('')
}

const mapStateToProps = (state) => {
  let props = {
    view: viewSelector(state),
    troutStreams: visibleTroutStreams(state),
    selectedState: selectedStateIdSelector(state),
    selectedRegion: selectedRegionIdSelector(state),
    regionLoadingStatus: regionLoadingStatusSelector(state),
    // searchText: searchTextSelector(state),
    streams: streamsSelector(state),
    showNoResultsFoundOverlay: showNoResultsFoundSelector(state)
  }

  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionLayout)
