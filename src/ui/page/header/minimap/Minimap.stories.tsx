import { action } from '@storybook/addon-actions'
import { boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
const kirby = require('ui/page/header/minimap/_stubs/kirby.gif')
import { IMinimapProps, MinimapComponent } from 'ui/page/header/minimap/Minimap.component'
import { createStatesAndRegions } from './svgMinimap/SvgMinimap.stories'
const stories = storiesOf('Page/Header/Minimap', module)
const classes = require('./Minimap.scss')
const dimensions = parseInt(classes['minimap-size'])
console.log(dimensions)
stories.add('Deafult Container', () => {
  const mapComponent = <img src={kirby} />
  const props: IMinimapProps = {
    isExpanded: boolean('Expand', true),
    handleExpand: action('Handle expand'),
    isReadyToReveal: boolean('Is ready to reveal', true),
    mapComponent,
  }
  return (
    <div style={{ position: 'absolute', bottom: 0, right: 10 }}>
      <MinimapComponent {...props} />
    </div>
  )
})

stories.add('Crazy content', () => {
  const mapComponent = (
    <span>
      <span>hello</span>
      <span>yes its me</span>
    </span>
  )
  const props: IMinimapProps = {
    isExpanded: boolean('Expand', false),
    handleExpand: action('Handle expand'),
    isReadyToReveal: boolean('Is ready to reveal', true),
    mapComponent,
  }
  return (
    <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
      <MinimapComponent {...props} />
    </div>
  )
})

stories.add('Real content', () => {
  const mapComponent = createStatesAndRegions(50, 50)
  const props: IMinimapProps = {
    isExpanded: boolean('Expand', false),
    handleExpand: action('Handle expand'),
    isReadyToReveal: boolean('Is ready to reveal', true),
    mapComponent,
  }
  return (
    <div style={{ position: 'absolute', top: 0, right: 0 }}>
      <MinimapComponent {...props} />
    </div>
  )
})
