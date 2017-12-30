import React from 'react'
import { storiesOf } from '@kadira/storybook'
import AgreementComponent from './Agreement.component'

storiesOf('core/termsOfAgreement', module)
  .add('Agreement', () => (
    <AgreementComponent />
  ))

