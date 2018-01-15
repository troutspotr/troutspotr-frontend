import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { BackButtonComponent, IBackButton } from './BackButton.component'

const stories = storiesOf('Page/Header/Backbutton', module)
stories.add('default button', () => {
  const props: IBackButton = {
    isEnabled: true,
    previous: '/stuff',
  }

  return <BackButtonComponent {...props} />
})

stories.add('hidden button', () => {
  const props: IBackButton = {
    isEnabled: false,
    previous: '/stuff',
  }

  return <BackButtonComponent {...props} />
})
