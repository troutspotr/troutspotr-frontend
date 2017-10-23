import RegionLayout from './Region.container'
const createRoutes = (store) => ({
  'path': '/:state/:region',
  'component': RegionLayout,
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [require('./@stream/streamDetails.routes').default(store)])
    }, 'streamDetails')
  },
})

export default createRoutes
