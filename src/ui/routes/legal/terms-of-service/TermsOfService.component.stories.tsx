import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { LegalLayout } from '../Legal.layout'
import { TermsOfServiceComponent } from './TermsOfService.component'
const stories = storiesOf('Legal', module)

stories.add('Privacy Policy', () => {
  return (
    <LegalLayout>
      <TermsOfServiceComponent advance={action('map initialized')} />
    </LegalLayout>
  )
})
