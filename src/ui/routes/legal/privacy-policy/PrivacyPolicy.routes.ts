import { PlainRoute } from 'react-router'
import { PrivacyPolicyContainer } from 'ui/routes/legal/privacy-policy/PrivacyPolicy.container'
export const createPrivacyPolicyRoutes = (store = null): PlainRoute => ({
  path: '/legal/privacy-policy',
  component: PrivacyPolicyContainer,
  childRoutes: [],
})
