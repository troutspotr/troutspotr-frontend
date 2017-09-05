import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import TermsOfService from './TermsOfService.component'

storiesOf('core/termsOfAgreement', module)
  .add('Terms of Service', () => (
    <TermsOfService />
  ))
