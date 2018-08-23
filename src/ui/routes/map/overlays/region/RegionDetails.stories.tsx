import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { RegionDetailsComponent } from './RegionDetails.component';
import { MessageOverlayComponent } from 'ui/core/messageOverlay/MessageOverlay.component';

const stories = storiesOf('Map/Region Details Message', module)
  
stories.add('Plain', () => {
  return <RegionDetailsComponent />
})

stories.add('Inside message overlay', () => {
  return <MessageOverlayComponent position={'top'}><RegionDetailsComponent /></MessageOverlayComponent>
})
