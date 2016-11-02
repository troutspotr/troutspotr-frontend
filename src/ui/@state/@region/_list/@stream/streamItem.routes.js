// import { injectReducer } from 'ui/reducers'

export default (store) => ({
  path : '/:state/:region/list/:streamId',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const StreaItem = require('./StreamItem.container').default
      // const reducer = require('./Map.state').default

      /*  Add the reducer to the store on key 'counter'  */
      // injectReducer(store, { key: 'map', reducer })

      /*  Return getComponent   */
      cb(null, StreaItem)

    /* Webpack named bundle   */
    }, 'streamItem')
  }
  // childRoutes : [
  //   regionRoutes(store)
  // ]
  // getChildRoutes (location, cb) {
  //   require.ensure([], (require) => {
  //     cb(null, [
  //       // Remove imports!
  //       require('./_list/list.routes').default(store),
  //       require('./_map/map.routes').default(store)
  //       // require('./_map').default(store)
  //     ])
  //   })
  // }
})
