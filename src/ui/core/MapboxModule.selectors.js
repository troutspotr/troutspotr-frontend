// import { createSelector } from 'reselect'
export const mapboxModuleSelector = state => {
  return state.mapModule.mapModule
}

export const isMapboxModuleLoadedSelector = state => {
  return state.mapModule.mapModuleStatus
}

// const ROOT = '/'
// export const isRootPageSelector = createSelector(
//   [locationSelector], (location) => {
//     let isRoot = isRootPageByUrl(location.pathname)
//     return isRoot
//   }
// )

// export const isRootPageByUrl = url => {
//   let isRoot = url === ROOT
//   return isRoot
// }
