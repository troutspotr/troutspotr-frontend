import { PlainRoute } from 'react-router'
import { ThankYouContainer } from './ThankYou.container'
export const createThankYouRoutes = (store = null): PlainRoute => ({
  path: '/legal/thank-you',
  component: ThankYouContainer,
  childRoutes: [],
})
