import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text, number } from '@storybook/addon-knobs'
import { StreamDetailsComponent, IStreamDetailsComponentProps } from './StreamDetails.component'
import { MessageOverlayComponent } from 'ui/core/messageOverlay/MessageOverlay.component'

const stories = storiesOf('Stream Overlay', module)

const makeStreamDetailsProps = (): IStreamDetailsComponentProps => {
  const props = {
    count: number('bridges', 15),
    status: select('status', ['open', 'closed', 'openCaution'], 'open') as 'open' | 'closed' | 'openCaution',
    statusText: text('status text', 'foo'),
    untilDateText: text('date', '1/12/12'),
    additionalText: text('addtl text', 'extra stuff here'),
  }

  return props
}

stories.add('Basics', () => {
  const props = makeStreamDetailsProps()
  return <StreamDetailsComponent { ...props } />
})

stories.add('Inside overlay', () => {
  const props = makeStreamDetailsProps()
  return <MessageOverlayComponent position={'top'}><StreamDetailsComponent { ...props } /></MessageOverlayComponent>
})
