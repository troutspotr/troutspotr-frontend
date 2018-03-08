import { PlainRoute } from 'react-router'
import { createUsStateRoutes } from 'ui/routes/@usState/UsState.routes'
import { createLegalRoutes } from 'ui/routes/legal/Legal.routes'
import { HomeComponent, PageContainer } from './Home.component'
export const createRoutes = (store = null): PlainRoute => ({
  path: '/',
  component: PageContainer,
  indexRoute: {
    component: HomeComponent,
  },

  childRoutes: [createLegalRoutes(store), createUsStateRoutes(store)],
})
