import { PlainRoute } from 'react-router'
import { LegalLayout } from './Legal.layout'
import { LegalIntroComponent } from './LegalIntro.component'

// routes

export const createLegalRoutes = (store = null): PlainRoute => ({
  path: '/legal',
  component: LegalLayout,
  indexRoute: {
    component: LegalIntroComponent,
  },
  getChildRoutes(location, cb) {
    import(/* webpackChunkName: "legal" */ './Legal.imports').then(
      ({ createPrivacyPolicyRoutes, createThankYouRoutes, createTermsOfServiceRoutes }) => {
        cb(null, [
          createPrivacyPolicyRoutes(store),
          createThankYouRoutes(store),
          createTermsOfServiceRoutes(store),
        ])
      }
    )
  },
})