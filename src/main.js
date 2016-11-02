let swInstaller = require('offline-plugin/runtime')
swInstaller.install()
// import 'ui/styles/core.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import configureStore from 'ui/configureStore'
import TroutMapsAppContainer from 'ui/TroutMapsApp.container'
// import routes from 'ui/routes'

// ========================================================
// Store and History Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = configureStore(initialState)
// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./ui/routes').default(store)
  ReactDOM.render(
    <TroutMapsAppContainer
      store={store}
      history={browserHistory}
      routes={routes}
    />,
    MOUNT_NODE
  )
}

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default
      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // // Setup hot module replacement
    module.hot.accept('ui/routes', () => {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    })
  }
}

// ========================================================
// Go!
// ========================================================
render()
