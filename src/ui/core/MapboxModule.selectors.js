// Import { createSelector } from 'reselect'
export const mapboxModuleSelector = (state) => state.mapModule.mapModule

export const isMapboxModuleLoadedSelector = (state) => state.mapModule.mapModuleStatus

// Const ROOT = '/'
// Export const isRootPageSelector = createSelector(
//   [locationSelector], (location) => {
//     Let isRoot = isRootPageByUrl(location.pathname)
//     Return isRoot
//   }
// )

// Export const isRootPageByUrl = url => {
//   Let isRoot = url === ROOT
//   Return isRoot
// }
