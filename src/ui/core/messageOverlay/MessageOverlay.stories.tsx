import { select, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { MessageOverlayComponent } from './MessageOverlay.component'
const stories = storiesOf('Core/Message Overlay', module)
const generateFakeContainer = content => {
  return (
    <div style={{ position: 'absolute', backgroundColor: 'gray', height: '100%', width: '100%' }}>
      {content}
    </div>
  )
}
stories.add('Position', () => {
  const orientation = select('Position', { top: 'top', bottom: 'bottom', none: 'none' }, 'top')

  if ((orientation as string) === 'none') {
    return generateFakeContainer(null)
  }

  const overlay = (
    <MessageOverlayComponent position={orientation}>
      {text('Content', 'Hello here is your content please type away')}
    </MessageOverlayComponent>
  )
  return generateFakeContainer(overlay)
})

stories.add('Too much text', () => {
  const orientation = select('Position', { top: 'top', bottom: 'bottom', none: 'none' }, 'top')

  if ((orientation as string) === 'none') {
    return null
  }
  const quote = (
    <span>
      Of course, now I am too old to be much of a fisherman, and now of course I usually fish the
      big waters alone, although some friends think I shouldn’t. Like many fly fishermen in western
      Montana where the summer days are almost Arctic in length, I often do not start fishing until
      the cool of the evening. Then in the Arctic half-light of the canyon, all existence fades to a
      being with my soul and memories and the sounds of the Big Blackfoot River and a four-count
      rhythm and the hope that a fish will rise.
    </span>
  )
  const overlay = <MessageOverlayComponent position={orientation}>{quote}</MessageOverlayComponent>
  return overlay
})
