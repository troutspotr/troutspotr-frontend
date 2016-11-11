import { injectReducer } from 'ui/reducers'

export default (store) => ({
  path : '/:state/:region/list',
  /*  Async getComponent is only invoked when route matches   */
  getIndexRoute (nextState, cb) {
    require.ensure([], (require) => {
      const StreamListContainer = require('./StreamList.container').default
      const reducer = require('./List.state').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'list', reducer })

      /*  Return getComponent   */
      cb(null, { component: StreamListContainer })

    /* Webpack named bundle   */
    }, 'list')
  },

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./@stream/streamItem.routes').default(store)
      ])
    })
  }
})
