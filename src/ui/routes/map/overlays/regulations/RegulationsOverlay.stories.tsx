import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { RegulationsOverlayComponent } from './RegulationsOverlay.component';
import { MessageOverlayComponent } from 'ui/core/messageOverlay/MessageOverlay.component';

const stories = storiesOf('Map/Regulations Overlay', module)
  
stories.add('Plain', () => {
  return <RegulationsOverlayComponent />
})

stories.add('Inside message overlay', () => {
  return <MessageOverlayComponent position={'top'}><RegulationsOverlayComponent /></MessageOverlayComponent>
})
