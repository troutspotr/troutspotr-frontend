import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Router} from 'react-router'
import {Provider} from 'react-redux'
// Import { isExpaned } from 'ui/core/header/minimap/Minimap.state'

class TroutMapsAppContainer extends Component {
  render () {
    const {history, routes, store} = this.props
    return (
      <Provider store={store}>
        <div style={{'height': '100%'}}>
          <Router history={history} onUpdate={this.onRouteUpdate}>
            {routes}
          </Router>
        </div>
      </Provider>
    )
  }
}

TroutMapsAppContainer.propTypes = {
  'history': PropTypes.object.isRequired,
  'routes': PropTypes.object.isRequired,
  'store': PropTypes.object.isRequired,
}

export default TroutMapsAppContainer
