
import { number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
const TroutRunCreek = require('../micromap/canvas/_stubs/south-branch-root.json') as IStreamObject
const GarvinBrook = require('../micromap/canvas/_stubs/garvin-brook.json') as IStreamObject
import * as MicromapSettings from 'ui/core/micromap/Micromap.settings'
import { LineMapComponentCanvas } from 'ui/core/linemap/Linemap.component';
import { getLinemapCanvasSettings } from 'ui/core/micromap/canvas/Micromap.stories';
import { IStreamObject } from 'coreTypes/IStreamObject';
import { SelectionStatus } from 'coreTypes/Ui';
import { BadgeComponent, Color, Fill } from 'ui/core/badge/Badge.component';
import { action } from '@storybook/addon-actions'

const regionDetailsStyles = require('ui/routes/map/overlays/region/RegionDetails.scss')
const storyStyles = require('./Linemap.stories.scss')

const stories = storiesOf('Linemap', module)

const DEFAULT_HEIGHT = 32

const renderStuff = (streamObject: IStreamObject) => {
  return (<div>
    <div>
      <span className={regionDetailsStyles.nonPublicMarker} />
      <span className={regionDetailsStyles.text}>{streamObject.stream.properties.trout_stream_section_length.toFixed(1)}</span>
    </div>
    <div>
      <span className={regionDetailsStyles.publicMarker} />
      <span className={regionDetailsStyles.text}>{streamObject.stream.properties.publicly_accessible_trout_stream_section_length.toFixed(1)}</span>
    </div>
  </div>)
}

const getSelectedIndex = (streamObject: IStreamObject): number => {
  const selectedIndex = number('Selected Access Point', -1, { range: true, min: -1, max: streamObject.accessPoints.length - 1, step: 1 })
  return selectedIndex
}

export const getLineOffsetLength = (streamObject: IStreamObject): number | null => {
  const lineOffsetLength = number('line offset length', -0.001, { range: true, min: -1, max: streamObject.stream.properties.length_mi, step: 0.001 })
  return lineOffsetLength < 0 ? null : lineOffsetLength
}

stories.add('Customize', () => {
  const lineOffsetLength = getLineOffsetLength(TroutRunCreek)
  const selectedAccesPointIndex = getSelectedIndex(TroutRunCreek)
  const defaultSettings = getLinemapCanvasSettings()
  const settings: MicromapSettings.IMicromapCanvasSettings = {
    ...defaultSettings,
    dimensions: {
      ...defaultSettings.dimensions,
      height: DEFAULT_HEIGHT,
    }
  }
  
  
  TroutRunCreek.accessPoints.forEach((x, index) => {
    x.properties = { ...x.properties, selectionStatus: SelectionStatus.Inactive }
    if (index === selectedAccesPointIndex) {
      x.properties = { ...x.properties, selectionStatus: SelectionStatus.Selected }
    }
  })

  const props = {
    settings,
    streamObject: TroutRunCreek,
    id: '123',
    lineOffsetLength,
    onLineOffsetChange: action('onLineOffsetChange'),
    onAccessPointSelect: action('onAccessPointSelect'),
  }
  return (<div className={storyStyles.container}>
    <span className={storyStyles.text}>
      <span className={storyStyles.textItem}>
          <div>
            <BadgeComponent badgeColor={Color.publiclyFishable} fillType={Fill.hollow} content={TroutRunCreek.accessPoints.filter(x => x.properties.bridgeType === 'publicTrout').length}/> <BadgeComponent badgeColor={Color.privatelyFishable} fillType={Fill.hollow} content={TroutRunCreek.accessPoints.filter(x => x.properties.bridgeType === 'permissionRequired').length}/>
          </div>
        {renderStuff(TroutRunCreek)}
      </span>
    </span>
    <LineMapComponentCanvas {...props} />
  </div>)
})

stories.add('Resize', () => {
  const lineOffsetLength = getLineOffsetLength(TroutRunCreek)
  const selectedAccesPointIndex = getSelectedIndex(TroutRunCreek)
  const defaultSettings = getLinemapCanvasSettings()
  const settings: MicromapSettings.IMicromapCanvasSettings = {
    ...defaultSettings,
    dimensions: {
      ...defaultSettings.dimensions,
      height: DEFAULT_HEIGHT,
    }
  }
  
  
  TroutRunCreek.accessPoints.forEach((x, index) => {
    x.properties = { ...x.properties, selectionStatus: SelectionStatus.Inactive }
    if (index === selectedAccesPointIndex) {
      x.properties = { ...x.properties, selectionStatus: SelectionStatus.Selected }
    }
  })

  const props = {
    settings,
    streamObject: TroutRunCreek,
    id: '123',
    lineOffsetLength,
    onLineOffsetChange: action('onLineOffsetChange'),
    onAccessPointSelect: action('onAccessPointClick'),
  }
  return (<div className={storyStyles.container} style={
    {
      margin: '20vmin',
      backgroundColor: '#222',
      padding: '2vmin',
      
    }
  }>
    <LineMapComponentCanvas {...props} />
  </div>)
})
