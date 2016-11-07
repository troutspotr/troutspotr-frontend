// import CoreLayoutContainer from './State/CoreLayout.container'
// import HomeContainer from './core'
import RegionSelectComponent from './RegionSelect.component'
import StateContainer from './State.container'

import regionRoutes from './@region/region.routes'
// console.log(regionRoutes, 'region routes')
// import { injectReducer } from '../../store/reducers'

const createRoutes = (store) => ({
  path        : '/:state',
  component   : StateContainer,
  // indexRoute  : { component: RegionSelectComponent },
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
  childRoutes : [
    regionRoutes(store)
  ]

  // getChildRoutes (location, cb) {
  //   require.ensure([], (require) => {
  //     cb(null, [
  //       // Remove imports!
  //       require('./@region/region.routes').default(store)
  //       // require('./_map').default(store)
  //     ])
  //   })
  // }
})

export default createRoutes
