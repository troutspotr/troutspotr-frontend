import { storiesOf } from '@storybook/react'
import * as React from 'react'
import * as Footer from './Footer.layout'
import { SwitchComponent } from './switch/Switch.component'
import { createSwitchProps } from './switch/Switch.stories'

const stories = storiesOf('Page/Footer', module)
stories.add('Footer Basics', () => {
  const view = <div>View</div>
  const gps = <div>GPS</div>
  const theme = <div>THEME</div>
  const props = {
    gps,
    theme,
    view,
  }

  return <Footer.FooterLayout {...props} />
})

stories.add('Footer Stuff', () => {
  const view = <SwitchComponent {...createSwitchProps('View')} />
  const gps = <SwitchComponent {...createSwitchProps('GPS')} />
  const theme = <SwitchComponent {...createSwitchProps('Theme')} />
  const props = {
    gps,
    theme,
    view,
  }
  return <Footer.FooterLayout {...props} />
})
