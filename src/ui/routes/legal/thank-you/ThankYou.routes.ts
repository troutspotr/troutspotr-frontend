import { PlainRoute } from 'react-router'
import { ThankYouComponent } from './ThankYou.component'
export const createThankYouRoutes = (store = null): PlainRoute => ({
  path: '/legal/thank-you',
  component: ThankYouComponent,
  childRoutes: [],
})
