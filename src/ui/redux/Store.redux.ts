import { browserHistory } from 'react-router'
import { applyMiddleware, compose, createStore } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createRoutes } from 'ui/routes/Routes'
import { AllReducers } from './Store.redux.rootReducer'
// tslint:disable-next-line:no-any
const { syncHistory, syncParams } = require('react-router-redux-params')

const initialState = {}
// Initial set up of enhancers and middleware
// is a one-time setup. It's acceptable to push here.
// tslint:disable-next-line:readonly-array
const enhancers = []
// tslint:disable-next-line:readonly-array
const middleware = [thunk, syncHistory(browserHistory), promiseMiddleware()]

// this allows you to use
// Redux dev tools from the chrome store.
if (process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line
  const devToolsExtension = (window as any).devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(
      devToolsExtension({
        maxAge: 5,
      })
    )
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)
const store = createStore(AllReducers, initialState, composedEnhancers)

// grab a copy of our application routes
// and pass them to sync up with redux automatically.
// this helps folks get any routing data (e.g. year, race, etc)
// safely, quickly, and universally out of redux.
const routes = createRoutes()
syncParams(store, routes, browserHistory)

export { store }
