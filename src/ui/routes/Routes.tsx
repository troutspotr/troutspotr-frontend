import { PlainRoute } from 'react-router'
import { HomeComponent, PageContainer } from './Home.component'
import { createLegalRoutes } from 'ui/routes/legal/Legal.routes'
import { createUsStateRoutes } from 'ui/routes/@usState/UsState.routes'
export const createRoutes = (store = null): PlainRoute => ({
  path: '/',
  component: PageContainer,
  indexRoute: {
    component: HomeComponent,
  },

  childRoutes: [createLegalRoutes(store), createUsStateRoutes(store)],
})
