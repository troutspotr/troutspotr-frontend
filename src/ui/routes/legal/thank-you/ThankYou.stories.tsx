import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { LegalLayout } from '../Legal.layout'
import { ThankYouComponent } from './ThankYou.component'
const stories = storiesOf('Legal', module)

stories.add('Thank You', () => {
  return (
    <LegalLayout>
      <ThankYouComponent advance={action('map initialized')} />
    </LegalLayout>
  )
})
