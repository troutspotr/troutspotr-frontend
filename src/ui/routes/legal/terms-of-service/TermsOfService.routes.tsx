import { PlainRoute } from 'react-router'
import { TermsOfServiceComponent } from './TermsOfService.component'
export const createTermsOfServiceRoutes = (store = null): PlainRoute => ({
  path: '/legal/terms-of-service',
  component: TermsOfServiceComponent,
  childRoutes: [],
})
