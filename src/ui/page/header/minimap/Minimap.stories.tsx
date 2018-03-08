import { action } from '@storybook/addon-actions'
import { boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
const kirby = require('ui/page/header/minimap/_stubs/kirby.gif')
import { IMinimapProps, MinimapComponent } from 'ui/page/header/minimap/Minimap.component'
const stories = storiesOf('Page/Header/Minimap', module)

stories.add('Deafult Container', () => {
  const closeButton = <button>Hello</button>
  const mapComponent = <img src={kirby} />
  const props: IMinimapProps = {
    isExpanded: boolean('Expand', false),
    handleExpand: action('Handle expand'),
    isReadyToReveal: boolean('Is ready to reveal', true),
    closeButton,
    mapComponent,
  }
  return (
    <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
      <MinimapComponent {...props} />
    </div>
  )
})

stories.add('Crazy content', () => {
  const closeButton = <button>Hello</button>
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
    closeButton,
    mapComponent,
  }
  return (
    <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
      <MinimapComponent {...props} />
    </div>
  )
})
