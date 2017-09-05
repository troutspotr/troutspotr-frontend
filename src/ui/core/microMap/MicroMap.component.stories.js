import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import MicroMapComponent from './MicroMap.component'
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs'

import RegionApiSync from 'api/RegionApi.sync'
const data = RegionApiSync.getRegionData('wi', 'driftless-central')
const stream = data.streamDictionary['85509']

const stories = storiesOf('core/micromap', module)
stories.addDecorator(withKnobs)

stories.add('MicroMap default', () => {
  return (<MicroMapComponent
    streamObject={stream}
    id='85509'
    isGpsActive={false}
    isVisible={true}
  />
  )
})



// isGpsTrackingSupported
// isGpsActiveButLoading
// isGpsActiveAndSuccessful
// startGpsTracking
// stopGpsTracking
// isGpsFailed
