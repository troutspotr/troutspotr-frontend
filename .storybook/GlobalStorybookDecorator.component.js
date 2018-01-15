import React, { Component } from 'react'
const classes = require('../src/ui/styles/core.scss')
import { select } from '@storybook/addon-knobs'

const StorybookGlobalDecoratorComponent = (storyFn, context) => {
  const theme = select('Theme', { dark: 'dark', light: 'light' }, 'dark')
  const themeClass = theme === 'dark' ? 'ts-dark' : 'ts-light'
  console.log('theme', themeClass)
  return (
    <div className={themeClass} id="storybookRoot">
      {storyFn()}
    </div>
  )
}

export default StorybookGlobalDecoratorComponent
