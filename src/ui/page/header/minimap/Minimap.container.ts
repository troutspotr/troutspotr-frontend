import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchTableOfContents } from 'ui/core/Core.redux'
import * as coreSelectors from 'ui/core/Core.selectors'
import { getGpsCoordinateFeatureSelector } from 'ui/core/gps/Gps.selectors'
import { updateCachedEndpoints } from 'ui/core/offline/Offline.redux'
import * as offlineSelectors from 'ui/core/offline/Offline.selectors'
import { isRootPageSelector } from 'ui/Location.selectors'
import * as stateSelectors from 'ui/routes/@usState/UsState.selectors'
import { MinimapComponent } from './Minimap.component'
import { isExpaned } from './Minimap.redux'
import {
  getIsOpenSelector,
  isExpandedSelector,
  isStreamCentroidsDisplayedSelector,
} from './Minimap.selectors'
const mapDispatchToProps = {
  expand: expanded => isExpaned(expanded),
  fetchTableOfContents: () => fetchTableOfContents(),
  updateCachedEndpoints: () => updateCachedEndpoints(),
}

const mapStateToProps = state => {
  const props = {
    isExpanded: isExpandedSelector(state),
    isRootPage: isRootPageSelector(state),
    statesGeoJson: coreSelectors.statesGeoJsonSelector(state),
    countiesGeoJson: coreSelectors.countiesGeoJsonSelector(state),
    regionsGeoJson: coreSelectors.regionsGeoJsonSelector(state),
    selectedState: coreSelectors.selectedStateSelector(state),
    selectedRegion: coreSelectors.selectedRegionSelector(state),
    // streamCentroidsGeoJson: stateSelectors.displayedCentroids(state),
    selectedStreamCentroid: stateSelectors.displayedStreamCentroidDataSelector(state),
    tableOfContentsLoadingStatus: coreSelectors.tableOfContentsLoadingStatusSelector(state),
    getIsOpen: getIsOpenSelector(state),
    isStreamCentroidsDisplayed: isStreamCentroidsDisplayedSelector(state),
    isOffline: offlineSelectors.isOfflineSelector(state),
    cachedRegions: offlineSelectors.cachedRegionsDictionary(state),
    currentGpsCoordinatesFeature: getGpsCoordinateFeatureSelector(state),
  }
  return props
}

export default withRouter(
  connect<{}, {}, {}>(mapStateToProps, mapDispatchToProps)(MinimapComponent)
)
