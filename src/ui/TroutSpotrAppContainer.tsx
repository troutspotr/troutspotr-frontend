import { History } from 'history'
import * as React from 'react'
import { Provider, Store } from 'react-redux'
import { PlainRoute } from 'react-router'
import { Router } from 'react-router'
require('ui/styles/core.scss')
export interface IAppProps {
  readonly routes: PlainRoute
  readonly history: History
  // tslint:disable-next-line:no-any
  readonly store: Store<any>
}

export class TroutSpotrAppContainer extends React.PureComponent<IAppProps> {
  public render(): JSX.Element {
    const { routes, history, store } = this.props
    return (
      <Provider store={store}>
        <Router history={history}>{routes}</Router>
      </Provider>
    )
  }
}
