import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { createRoutes } from 'ui/routes/Routes'
import { store } from 'ui/redux/Store.redux'
import 'ui/styles/core.scss'
import { TroutSpotrAppContainer } from 'ui/TroutSpotrAppContainer'

const routes = createRoutes()
ReactDOM.render(
  <TroutSpotrAppContainer history={browserHistory} store={store} routes={routes} />,
  document.getElementById('root') as HTMLElement
)
