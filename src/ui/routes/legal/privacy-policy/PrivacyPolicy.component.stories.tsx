/* eslint-disable no-console */
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { PrivacyPolicyComponent } from './PrivacyPolicy.component'
import { action } from '@storybook/addon-actions'
import { LegalLayout } from 'ui/routes/legal/Legal.layout'
const stories = storiesOf('Legal', module)

stories.add('Terms of Service', () => {
  return (
    <LegalLayout>
      <PrivacyPolicyComponent advance={action('map initialized')} />
    </LegalLayout>
  )
})
