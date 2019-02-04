import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { LoadingComponent } from './Loading.component'
import { text } from '@storybook/addon-knobs'
import { MessageOverlayComponent } from 'ui/core/messageOverlay/MessageOverlay.component';

const stories = storiesOf('Loading', module)

stories.add('with normal text', () => {
  return <LoadingComponent title={'title goes here'} />
})

stories.add('with long-ass text', () => {
  const title = text('title', 'really really long title that just keeps going forever and ever')

  return (
    <LoadingComponent
      title={title}
    />
  )
})

stories.add('as message box', () => {
  const title = text('title', 'really really long title that just keeps going forever and ever')

  const content = (
    <LoadingComponent
      title={title}
    />
  )

  return <MessageOverlayComponent position='top'>{content}</MessageOverlayComponent>
})
