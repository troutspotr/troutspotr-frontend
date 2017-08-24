const swInstaller = require('offline-plugin/runtime')
/* eslint-disable import/first */
swInstaller.install()
import 'ui/styles/core.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'
import configureStore from 'ui/configureStore'
import TroutMapsAppContainer from 'ui/TroutMapsApp.container'
import AnonymousAnalyzerApi from 'api/AnonymousAnalyzerApi'
// Import 'babel-polyfill'
// Import FastClick from 'fastclick'
// Import routes from 'ui/routes'

import Promise from 'promise-polyfill'

// To add to window
if (!window.Promise) {
  window.Promise = Promise
}

// ========================================================
// Store and History Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = configureStore(initialState)
// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')
MOUNT_NODE.innerHTML = ''
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

// This code is excluded from production bundle
if (__DEV__ || false) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      console.log(error) // eslint-disable-line
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
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

setTimeout(render, 1000)
AnonymousAnalyzerApi.recordEvent('page_initialized', {})



// ========================================================
// Set up FastClick
// ========================================================
/* eslint-disable extra-rules/no-commented-out-code */
try {
  // Const isIos = function () {
  //   // Reference: http://stackoverflow.com/questions/9038625/detect-if-device-is-ios#answer-9039885
  //   Return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
  // }

  // Const isRunningStandalone = function () {
  //       // Bullet proof way to check if iOS standalone
  //   Var isRunningiOSStandalone = window.navigator.standalone

  //   // Reliable way (in newer browsers) to check if Android standalone.
  //   // http://stackoverflow.com/questions/21125337/how-to-detect-if-web-app-running-standalone-on-chrome-mobile#answer-34516083
  //   Var isRunningAndroidStandalone = window.matchMedia('(display-mode: standalone)').matches

  //   Return isRunningiOSStandalone || isRunningAndroidStandalone
  // }

  // If (isIos() && isRunningStandalone()) {
  //       // Initialize Fast Click
  //       // Even with the latest webkit updates, unfortunatley iOS standalone apps still have the 350ms click delay,
  //       // so we need to bring in fastclick to alleviate this.
  //       // See http://stackoverflow.com/questions/39951945/ios-standalone-app-300ms-click-delay
  //   If ('addEventListener' in document) {
  //     Document.addEventListener('DOMContentLoaded', function () {
  //       FastClick.attach(document.body)
  //     }, false)
  //   }
  // }
} catch (e) {
  // alert(e.message)
}
/* eslint-enable extra-rules/no-commented-out-code */
