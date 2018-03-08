import regionRoutes from './@region/Region.routes'
import { createCreditsRoutes } from './credits/Credits.routes'
import StateContainer from './UsState.container'
export const createUsStateRoutes = store => ({
  path: '/:usState',
  component: StateContainer,
  childRoutes: [createCreditsRoutes(store), regionRoutes(store)],
})
