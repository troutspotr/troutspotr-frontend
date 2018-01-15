import StateContainer from './State.container'

import regionRoutes from './_region/region.routes'

const createRoutes = store => ({
  path: '/:state',
  component: StateContainer,
  childRoutes: [regionRoutes(store)],
})

export default createRoutes
