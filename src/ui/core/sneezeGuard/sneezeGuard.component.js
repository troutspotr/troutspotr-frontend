import React, { PropTypes, Component } from 'react'
import classes from './SneezeGuard.scss'

class SneezeGuardComponent extends Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    if (this.props.close) {
      this.props.close()
    }
  }

  render () {
    return (<span onClick={this.onClick} className={classes.sneezeGuard} />)
  }
}

SneezeGuardComponent.propTypes = {
  close: PropTypes.func
}

export default SneezeGuardComponent
