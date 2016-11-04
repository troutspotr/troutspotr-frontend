// import CoreLayoutContainer from './State/CoreLayout.container'
// import HomeContainer from './core'
import RegionContainer from './Region.container'
import StreamViewSelectFooter from './StreamViewSelectFooter.component'

// import regionRoutes from './@region/region.routes'
// import { injectReducer } from '../../store/reducers'
const AVAILABLE_VIEWS = ['list', 'map']
const PREFERED_VIEW_DEFAULT = AVAILABLE_VIEWS[0]
const createRoutes = (store) => ({
  path        : '/:state/:region',
  component   : RegionContainer,
  indexRoute  : {
    onEnter: (args, replace) => {
      debugger
      let { pathname } = args.location
      let redirectLocation = `${pathname}/${PREFERED_VIEW_DEFAULT}`
      replace(redirectLocation)
    }
  },

  // getComponent (nextState, cb) {
  //   /*  Webpack - use 'require.ensure' to create a split point
  //       and embed an async module loader (jsonp) when bundling   */
  //   require.ensure([], (require) => {
  //     /*  Webpack - use require callback to define
  //         dependencies for bundling   */
  //     const Counter = require('./containers/CounterContainer').default
  //     const reducer = require('./modules/counter').default

  //     /*  Add the reducer to the store on key 'counter'  */
  //     injectReducer(store, { key: 'counter', reducer })

  //     /*  Return getComponent   */
  //     cb(null, Counter)

  //   /* Webpack named bundle   */
  //   }, 'counter')
  // },
  // childRoutes : [
  //   regionRoutes(store)
  // ]

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports!
        require('./_list/list.routes').default(store),
        require('./_map/map.routes').default(store)
        // require('./_map').default(store)
      ])
    })
  }
})

export default createRoutes
