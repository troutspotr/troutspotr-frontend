import React, { Component, PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
// import { isExpaned } from 'ui/core/header/minimap/Minimap.state'

class TroutMapsAppContainer extends Component {
  render () {
    const { history, routes, store } = this.props
    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={history} children={routes} onUpdate={this.onRouteUpdate} />
        </div>
      </Provider>
    )
  }
}

TroutMapsAppContainer.propTypes = {
  history : PropTypes.object.isRequired,
  routes  : PropTypes.object.isRequired,
  store   : PropTypes.object.isRequired
}

export default TroutMapsAppContainer
