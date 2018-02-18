// Import { injectReducer } from 'ui/reducers'
import StreamDetailsContainer from './StreamDetails.container'
export default store => ({
  path: '/:state/:region/:streamId',
  component: StreamDetailsContainer,
  /*  Async getComponent is only invoked when route matches   */
  // getComponent(nextState, cb) {
  //   require.ensure(
  //     [],
  //     require => {
  //       const StreamItem = require('./StreamDetails.container.ts').default
  //       cb(null, StreamItem)
  //     },
  //     'streamDetails'
  //   )
  // },
})
