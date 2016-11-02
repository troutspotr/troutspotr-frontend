import CoreLayoutContainer from './core/CoreLayout.container'
import HomeContainer from './core'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayoutContainer,
  indexRoute  : HomeContainer,
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports!
        require('./@state/state.routes').default(store)
      ])
    })
  }
})

export default createRoutes
