import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { TermsOfServiceComponent } from './TermsOfService.component'
import { action } from '@storybook/addon-actions'
import { LegalLayout } from '../Legal.layout'
const stories = storiesOf('Legal', module)

stories.add('Privacy Policy', () => {
  return (
    <LegalLayout>
      <TermsOfServiceComponent advance={action('map initialized')} />
    </LegalLayout>
  )
})
