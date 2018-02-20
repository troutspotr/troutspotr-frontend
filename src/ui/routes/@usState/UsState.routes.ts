import StateContainer from './UsState.container'
import regionRoutes from './@region/Region.routes'
import { createCreditsRoutes } from './credits/Credits.routes'
export const createUsStateRoutes = store => ({
  path: '/:usState',
  component: StateContainer,
  childRoutes: [createCreditsRoutes(store), regionRoutes(store)],
})
