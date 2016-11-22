import { connect } from 'react-redux'
import MapComponent from './Map.component'
import { loadMapModuleAsync } from 'ui/core/MapboxModule.state'
import { mapboxModuleSelector, isMapboxModuleLoadedSelector } from 'ui/core/MapboxModule.selectors'
import { setIsMapInitialized } from './Map.state.interactivity'
import {
  isReadyToInsertLayersSelector,
  getMapCameraSelector,
  getMapGroundSelector,
  getMapSettingsSelector,
  getMapInteractivitySelector } from './Map.selectors'

const mapDispatchToProps = {
  loadMapModuleAsync: () => loadMapModuleAsync(),
  setIsMapInitialized: isInitialized => setIsMapInitialized(isInitialized)
}

const mapStateToProps = (state) => {
  let props = {
    mapboxModule: mapboxModuleSelector(state),
    mapboxModuleStatus: isMapboxModuleLoadedSelector(state),
    isReadyToInsertLayers: isReadyToInsertLayersSelector(state),
    camera: getMapCameraSelector(state),
    ground: getMapGroundSelector(state),
    settings: getMapSettingsSelector(state),
    interactivity: getMapInteractivitySelector(state)
  }
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent)
