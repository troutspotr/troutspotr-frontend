import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { BackButtonComponent, IBackButton } from './BackButton.component'
import { boolean } from '@storybook/addon-knobs'

const stories = storiesOf('Page/Header/Backbutton', module)
stories.add('default button', () => {
  const props: IBackButton = {
    isEnabled: boolean('enabled', true),
    previous: '/stuff',
  }

  return <BackButtonComponent {...props} />
})
