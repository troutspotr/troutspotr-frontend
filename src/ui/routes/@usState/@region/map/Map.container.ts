import { connect } from 'react-redux'
import { selectedRegionIdSelector, selectedStateIdSelector } from 'ui/core/Core.selectors'
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
import { selectFoculPoint, selectMapFeature, setIsMapInitialized } from './Map.redux.interactivity'

import { withRouter } from 'react-router'

import {
  getMapCameraSelector,
  getMapInteractivitySelector,
  isReadyToInsertLayersSelector,
} from './Map.selectors'

const mapDispatchToProps = {
  loadMapModuleAsync: () => loadMapModuleAsync(),
  setIsMapInitialized: isInitialized => setIsMapInitialized(isInitialized),
  selectMapFeature: feature => selectMapFeature(feature),
  selectFoculPoint: feature => selectFoculPoint(feature),
}

const mapStateToProps = state => {
  const props = {
    mapboxModule: mapboxModuleSelector(state),
    mapboxModuleStatus: isMapboxModuleLoadedSelector(state),
    isReadyToInsertLayers: isReadyToInsertLayersSelector(state),
    camera: getMapCameraSelector(state),
    // ground: getMapGroundSelector(state),
    // settings: getMapSettingsSelector(state),
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

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(MapComponent))
