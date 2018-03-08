/* eslint-disable no-console */
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { LegalLayout } from 'ui/routes/legal/Legal.layout'
import { PrivacyPolicyComponent } from './PrivacyPolicy.component'
const stories = storiesOf('Legal', module)

stories.add('Terms of Service', () => {
  return (
    <LegalLayout>
      <PrivacyPolicyComponent advance={action('map initialized')} />
    </LegalLayout>
  )
})
