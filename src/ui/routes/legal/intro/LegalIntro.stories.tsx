/* eslint-disable no-console */
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { LegalLayout } from 'ui/routes/legal/Legal.layout'
import { LegalIntroComponent } from './LegalIntro.component'
const stories = storiesOf('Legal', module)

stories.add('Intro', () => {
  return (
    <LegalLayout>
      <LegalIntroComponent advance={action('map initialized')} />
    </LegalLayout>
  )
})
