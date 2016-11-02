import { injectReducer } from 'ui/reducers'

export default (store) => ({
  path : '/:state/:region/list',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const StreamListContainer = require('./StreamList.container').default
      const reducer = require('./List.state').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'list', reducer })

      /*  Return getComponent   */
      cb(null, StreamListContainer)

    /* Webpack named bundle   */
    }, 'list')
  }
})
