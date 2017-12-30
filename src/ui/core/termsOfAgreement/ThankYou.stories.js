import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ThankYou from './ThankYou.component'

storiesOf('core/termsOfAgreement', module)
  .add('Thank You', () => (
    <ThankYou />
  ))
