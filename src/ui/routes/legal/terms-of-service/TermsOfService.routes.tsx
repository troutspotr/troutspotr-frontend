import { PlainRoute } from 'react-router'
import { TermsOfServiceContainer } from './TermsOfService.container'
export const createTermsOfServiceRoutes = (store = null): PlainRoute => ({
  path: '/legal/terms-of-service',
  component: TermsOfServiceContainer,
  childRoutes: [],
})
