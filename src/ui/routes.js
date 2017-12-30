import CoreLayoutContainer from './core/CoreLayout.container'
import HomeContainer from './core'
import stateRoutes from './@state/state.routes'
export const createRoutes = (store) => ({
  'path': '/',
  'component': CoreLayoutContainer,
  'indexRoute': HomeContainer,

  'childRoutes': [stateRoutes(store)],
})

export default createRoutes
