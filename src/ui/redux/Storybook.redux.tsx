import * as React from 'react'
import { Provider, connect } from 'react-redux'
import { store } from './Store.redux'
import {
  mapDispatchToProps,
  mapStateToProps,
} from 'ui/routes/_state/State.container'

export default function StorybookProvider({ story }) {
  return <Provider store={store}>{story}</Provider>
}

import React, { Component } from 'react'
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

export StorybookGlobalDecoratorComponent

export class UsStateStory extends React.Component {
  render() {
    return (
        <div>hello</div>
    )
  }
}

export connect(mapStateToProps, mapDispatchToProps)(UsStateStory)