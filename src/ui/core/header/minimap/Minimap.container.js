import { connect } from 'react-redux'
import MinimapComponent from './Minimap.component'
import { isExpaned } from './Minimap.state'
import { isExpandedSelector, getIsOpenSelector, isStreamCentroidsDisplayedSelector } from './Minimap.selectors'
import { withRouter } from 'react-router'
import { isRootPageSelector } from 'ui/Location.selectors'
import { fetchTableOfContents } from 'ui/core/Core.state'
import * as coreSelectors from 'ui/core/Core.selectors'
import * as stateSelectors from 'ui/@state/State.selectors'
import * as offlineSelectors from 'ui/core/offline/Offline.selectors'
const mapDispatchToProps = {
  expand: (expanded) => isExpaned(expanded),
  fetchTableOfContents: () => fetchTableOfContents()
}

const mapStateToProps = (state) => {
  let props = {
    isExpanded: isExpandedSelector(state),
    isRootPage: isRootPageSelector(state),
    statesGeoJson: coreSelectors.statesGeoJsonSelector(state),
    countiesGeoJson: coreSelectors.countiesGeoJsonSelector(state),
    regionsGeoJson: coreSelectors.regionsGeoJsonSelector(state),
    selectedState: coreSelectors.selectedStateSelector(state),
    selectedRegion: coreSelectors.selectedRegionSelector(state),
    streamCentroidsGeoJson: stateSelectors.displayedCentroids(state),
    selectedStreamCentroid: stateSelectors.displayedStreamCentroidDataSelector(state),
    tableOfContentsLoadingStatus: coreSelectors.tableOfContentsLoadingStatusSelector(state),
    getIsOpen: getIsOpenSelector(state),
    isStreamCentroidsDisplayed: isStreamCentroidsDisplayedSelector(state),
    isOffline: offlineSelectors.isOfflineSelector(state),
    cachedRegions: offlineSelectors.cachedRegionsDictionary(state)
  }
  return props
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MinimapComponent))
