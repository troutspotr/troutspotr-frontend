import RegionLayout from './Region.container'
// import StreamDetails from './@stream/StreamDetails.routes'
const createRoutes = store => ({
  path: '/:usState/:region',
  component: RegionLayout,
  childRoutes: [
    // StreamDetails(store)
  ],
  // getChildRoutes(location, cb) {
  //   require.ensure(
  //     [],
  //     require => {
  //       cb(null, [require('./@stream/StreamDetails.routes.ts').default(store)])
  //     },
  //     'streamDetails'
  //   )
  // },
})

export default createRoutes
