import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './SneezeGuard.scss'
class SneezeGuardComponent extends Component {
  onClick = () => {
    if (this.props.close) {
      this.props.close()
    }
  }

  render () {
    return (<span onClick={this.onClick} className={classes.sneezeGuard} />)
  }
}

SneezeGuardComponent.propTypes = {'close': PropTypes.func}

export default SneezeGuardComponent
