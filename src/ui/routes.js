import CoreLayoutContainer from './core/CoreLayout.container'
import HomeContainer from './core'
import stateRoutes from './@state/state.routes'
// import { isRootPageByUrl } from './Location.selectors'
export const createRoutes = (store) => ({
  path: '/',
  onEnter: ({ location }, replace) => {
    // let noOtherStatesButMinnesotaSoJustRedirectToMnThanks = true
    // let isRoot = isRootPageByUrl(location.pathname)
    // if (isRoot && noOtherStatesButMinnesotaSoJustRedirectToMnThanks) {
    //   console. log('forcing redirect to minnesota because why not')
    //   return replace(`/wi`)
    // }
  },
  component: CoreLayoutContainer,
  indexRoute: HomeContainer,

  childRoutes: [stateRoutes(store)]
})

export default createRoutes

// import CoreLayoutContainer from './core/CoreLayout.container'
// import HomeContainer from './core'

// export const createRoutes = (store) => ({
//   path        : '/',
//   component   : CoreLayoutContainer,
//   indexRoute  : HomeContainer,
//   getChildRoutes (location, cb) {
//     require.ensure([], (require) => {
//       cb(null, [
//         // Remove imports!
//         require('./@state/state.routes').default(store)
//       ])
//     })
//   }
// })

// export default createRoutes
