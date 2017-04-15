// let swInstaller = require('offline-plugin/runtime')
// swInstaller.install()
import 'ui/styles/core.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import configureStore from 'ui/configureStore'
import TroutMapsAppContainer from 'ui/TroutMapsApp.container'
import AnonymousAnalyzerApi from 'api/AnonymousAnalyzerApi'
// import 'babel-polyfill'
// import Perf from 'react-addons-perf'
// window.Perf = Perf
// import FastClick from 'fastclick'
// import routes from 'ui/routes'

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

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEV__) {
  if (window.devToolsExtension) {
    // window.devToolsExtension.open()
  }
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      // const RedBox = require('redbox-react').default
      // ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
      console.log(error)
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

setTimeout(render, 1000)
AnonymousAnalyzerApi.recordEvent('page_initialized', {})

// render()

// ========================================================
// Set up FastClick
// ========================================================
try {
  // const isIos = function () {
  //   // Reference: http://stackoverflow.com/questions/9038625/detect-if-device-is-ios#answer-9039885
  //   return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
  // }

  // const isRunningStandalone = function () {
  //       // Bullet proof way to check if iOS standalone
  //   var isRunningiOSStandalone = window.navigator.standalone

  //   // Reliable way (in newer browsers) to check if Android standalone.
  //   // http://stackoverflow.com/questions/21125337/how-to-detect-if-web-app-running-standalone-on-chrome-mobile#answer-34516083
  //   var isRunningAndroidStandalone = window.matchMedia('(display-mode: standalone)').matches

  //   return isRunningiOSStandalone || isRunningAndroidStandalone
  // }

  // if (isIos() && isRunningStandalone()) {
  //       // Initialize Fast Click
  //       // Even with the latest webkit updates, unfortunatley iOS standalone apps still have the 350ms click delay,
  //       // so we need to bring in fastclick to alleviate this.
  //       // See http://stackoverflow.com/questions/39951945/ios-standalone-app-300ms-click-delay
  //   if ('addEventListener' in document) {
  //     document.addEventListener('DOMContentLoaded', function () {
  //       FastClick.attach(document.body)
  //     }, false)
  //   }
  // }
} catch (e) {
  alert(e.message)
}
