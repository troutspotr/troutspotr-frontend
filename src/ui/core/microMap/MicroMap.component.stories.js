import React from 'react'
import { storiesOf } from '@kadira/storybook'
import MicroMapComponent from './MicroMap.component'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { times } from 'lodash'

import RegionApiSync from 'api/RegionApi.sync'
import classes from './MicroMap.scss'
const data = RegionApiSync.getRegionData('wi', 'driftless-central')
const id = '102103'

const stories = storiesOf('core/micromap', module)
stories.addDecorator(withKnobs)

stories.add('MicroMap default', () => {
  const stream = data.streamDictionary[id]
  const tenSmallOnes = 10
  const firstStep = 0.1
  const maxSize = 0.20
  const stepSize = (1 / tenSmallOnes) * (maxSize - firstStep)
  const tenSmallMaps = times(10).map(i => {
    const scale = firstStep + (i * stepSize)
    return <MicroMapComponent
      key={i}
      streamObject={stream}
      id={id}
      isGpsActive={false}
      isVisible={true}
      scale={scale}
    />
  })
  return (<div>
    <div>{tenSmallMaps}</div>
    <MicroMapComponent
      className={classes.containerMd}
      streamObject={stream}
      id={id}
      isGpsActive={false}
      isVisible={true}
      scale={0.3}
    />
    <MicroMapComponent
      className={classes.containerLg}
      streamObject={stream}
      id={id}
      isGpsActive={false}
      isVisible={true}
      scale={0.7}
    />
  </div>
  )
})
