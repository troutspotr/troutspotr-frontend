import { connect } from 'react-redux'
import { loadMapModuleAsync } from 'ui/core/MapboxModule.redux'
import { isMapboxModuleLoadedSelector, mapboxModuleSelector } from 'ui/core/MapboxModule.selectors'
import {
  getSelectedRoadSelector,
  getSpecialRegulationsCurrentSeasonSelector,
  isFinishedLoadingRegion,
  selectedStreamObjectSelector,
  troutStreamDictionarySelector,
} from 'ui/routes/@usState/@region/Region.selectors'
import { MapComponent } from './Map.component'

import { selectFoculPoint, selectMapFeature, setIsMapInitialized, navigateToAccessPoint, navigateToStream } from './Map.redux.interactivity'

import { withRouter } from 'react-router'

import {
  getMapCameraSelector,
  getMapInteractivitySelector,
  isReadyToInsertLayersSelector,
} from './Map.selectors'
import { selectedStateIdSelector, selectedRegionIdSelector } from 'ui/Location.selectors'

const mapDispatchToProps = {
  loadMapModuleAsync: () => loadMapModuleAsync(),
  setIsMapInitialized: isInitialized => setIsMapInitialized(isInitialized),
  navigateToAccessPoint: (accessPointGid: number) => navigateToAccessPoint(accessPointGid),
  navigateToStream: (streamGid: number) => navigateToStream(streamGid),
  selectMapFeature: feature => selectMapFeature(feature),
  selectFoculPoint: feature => selectFoculPoint(feature),
}

const mapStateToProps = state => {
  const props = {
    mapboxModule: mapboxModuleSelector(state),
    mapboxModuleStatus: isMapboxModuleLoadedSelector(state),
    isReadyToInsertLayers: isReadyToInsertLayersSelector(state),
    camera: getMapCameraSelector(state),
    interactivity: getMapInteractivitySelector(state),
    selectedState: selectedStateIdSelector(state),
    selectedRegion: selectedRegionIdSelector(state),
    selectedGeometry: selectedStreamObjectSelector(state),
    specialRegulationsCurrentSeason: getSpecialRegulationsCurrentSeasonSelector(state),
    selectedRoad: getSelectedRoadSelector(state),
    streamDictionary: troutStreamDictionarySelector(state),
    isRegionFinishedLoading: isFinishedLoadingRegion(state),
  }

  return props
}

export const MapContainer = withRouter(
  connect<any, any, any>(mapStateToProps, mapDispatchToProps)(MapComponent)
)
