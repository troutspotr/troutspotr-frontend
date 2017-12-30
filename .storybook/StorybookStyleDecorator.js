import 'ui/styles/core.scss'
import React from 'react'
import { Provider } from 'react-redux'
import makeReduxStore from 'ui/configureStore'
const store = makeReduxStore(window.__INITIAL_STATE__)
const StorybookStyleDecorator = (storyFn) => (
  <Provider store={store}>
    <div style={{ height: '100%' }} >
      { storyFn() }
    </div>
  </Provider>
)

export default StorybookStyleDecorator
