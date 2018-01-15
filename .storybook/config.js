import { configure, addDecorator } from '@storybook/react'
import StorybookStyleDecorator from './GlobalStorybookDecorator.component'
import { withKnobs, select } from '@storybook/addon-knobs'
import React, { Component } from 'react'
const classes = require('../src/ui/styles/core.scss')
const req = require.context('../src', true, /.stories.tsx$/)
function loadStories() {
  req
    .keys()
    .sort()
    .forEach(req)
}

// addDecorator(StorybookStyleDecorator)
addDecorator(story => {
  const content = story() // call story early so knob store is created before `select` call
  const theme = select('Theme', { dark: 'dark', light: 'light' }, 'dark')
  const themeClass = theme === 'dark' ? 'ts-dark' : 'ts-light'
  return (
    <div
      className={themeClass}
      style={{ height: '100%', margin: 0, overflow: 'auto' }}
      id="storybookRoot"
    >
      {content}
    </div>
  )
})
addDecorator(withKnobs) // add withKnobs

configure(loadStories, module)
