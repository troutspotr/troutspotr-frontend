import { PlainRoute } from 'react-router'
import { LegalLayout } from './Legal.layout'
import { LegalIntroComponent } from './LegalIntro.component'

// routes
import { createPrivacyPolicyRoutes } from './privacy-policy/PrivacyPolicy.routes'
import { createThankYouRoutes } from './thank-you/ThankYou.routes'
import { createTermsOfServiceRoutes } from './terms-of-service/TermsOfService.routes'
export const createLegalRoutes = (store = null): PlainRoute => ({
  path: '/legal',
  component: LegalLayout,
  indexRoute: {
    component: LegalIntroComponent,
  },

  childRoutes: [
    createPrivacyPolicyRoutes(store),
    createThankYouRoutes(store),
    createTermsOfServiceRoutes(store),
  ],
})
