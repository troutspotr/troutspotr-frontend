import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { createRoutes } from 'ui/routes/Routes'
import { store } from 'ui/redux/Store.redux'
import 'ui/styles/core.scss'
import { TroutMapsAppContainer } from 'ui/TroutMapsAppContainer'

const routes = createRoutes()
ReactDOM.render(
  <TroutMapsAppContainer history={browserHistory} store={store} routes={routes} />,
  document.getElementById('root') as HTMLElement
)
