export const mapboxModuleSelector = state => {
  return state.mapModule.mapboxModule
}

export const isMapboxModuleLoadedSelector = state => {
  return state.mapModule.isMapModuleLoaded
}
