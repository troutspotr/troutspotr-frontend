import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import ThankYou from './ThankYou.component'

storiesOf('core/termsOfAgreement', module)
  .add('Thank You', () => (
    <ThankYou />
  ))
