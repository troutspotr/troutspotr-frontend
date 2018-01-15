import { PlainRoute } from 'react-router'
// import CoreLayoutContainer from './core/CoreLayout.container'
// import HomeContainer from './core'
// import stateRoutes from './@state/state.routes'
// import { isRootPageByUrl } from './Location.selectors'
export const createRoutes = (store = null): PlainRoute => ({
  path: '/',
  // onEnter: ({ location }, replace) => {
  //   let noOtherStatesButMinnesotaSoJustRedirectToMnThanks = true
  //   let isRoot = isRootPageByUrl(location.pathname)
  //   if (isRoot && noOtherStatesButMinnesotaSoJustRedirectToMnThanks) {
  //     console.log('forcing redirect to minnesota because why not')
  //     return replace(`/mn`)
  //   }
  // },
  // component: CoreLayoutContainer,
  // indexRoute: HomeContainer,

  // childRoutes: [stateRoutes(store)]
  childRoutes: [],
})
