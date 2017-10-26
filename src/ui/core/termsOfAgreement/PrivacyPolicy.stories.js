import React from 'react'
import { storiesOf } from '@kadira/storybook'
import PrivacyPolicy from './PrivacyPolicy.component'

storiesOf('core/termsOfAgreement', module)
  .add('Privacy Policy', () => (
    <PrivacyPolicy />
  ))
