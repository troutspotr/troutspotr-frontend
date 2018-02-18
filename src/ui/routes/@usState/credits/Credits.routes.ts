import { PlainRoute } from 'react-router'
import { CreditsComponent } from './Credits.component'
import { CreditsLayout } from './Credits.layout'
export const createCreditsRoutes = (store = null): PlainRoute => ({
  path: '/:usState/credits',
  component: CreditsLayout,
  indexRoute: { component: CreditsComponent },
  childRoutes: [],
})
