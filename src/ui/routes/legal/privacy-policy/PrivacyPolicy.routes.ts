import { PlainRoute } from 'react-router'
import { PrivacyPolicyComponent } from './PrivacyPolicy.component'
export const createPrivacyPolicyRoutes = (store = null): PlainRoute => ({
  path: '/legal/privacy-policy',
  component: PrivacyPolicyComponent,
  childRoutes: [],
})
