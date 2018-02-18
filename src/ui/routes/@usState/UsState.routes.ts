import StateContainer from './UsState.container'
import regionRoutes from './@region/Region.routes'
import { createCreditsRoutes } from './credits/Credits.routes'
export const createUsStateRoutes = store => ({
  path: '/:usState',
  component: StateContainer,
  childRoutes: [
    // having fun
    createCreditsRoutes(store),
    regionRoutes(store),
  ],
})
