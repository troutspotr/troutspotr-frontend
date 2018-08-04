import { number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { PublicBridgesComponent } from './PublicBridges.component';

const stories = storiesOf('Public Bridges Component', module)
  
stories.add('Plain', () => {
  const count = number('Age', 89)
  return <PublicBridgesComponent count={count}/>
})