// import RegionContainer from './Region.container'

const AVAILABLE_VIEWS = ['list', 'map']
const PREFERED_VIEW_DEFAULT = AVAILABLE_VIEWS[0]

const createRoutes = (store) => ({
  path        : '/:state/:region',
  // component   : RegionContainer,
  indexRoute  : {
    onEnter: (args, replace) => {
      let { pathname } = args.location
      let redirectLocation = `${pathname}/${PREFERED_VIEW_DEFAULT}`
      replace(redirectLocation)
    }
  },

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
