import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install()

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { store } from 'ui/redux/Store.redux'
import { createRoutes } from 'ui/routes/Routes'
import 'ui/styles/core.scss'
import { TroutSpotrAppContainer } from 'ui/TroutSpotrAppContainer'

const routes = createRoutes()
setTimeout(() => {
  ReactDOM.render(
    <TroutSpotrAppContainer history={browserHistory} store={store} routes={routes} />,
    document.getElementById('root') as HTMLElement
  )
}, 200)
