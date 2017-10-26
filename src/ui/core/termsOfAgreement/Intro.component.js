import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './Agreement.scss'
import Button from './Button.component.js'

class IntroComponent extends Component {
  componentDidMount () {
    this.time = new Date()
  }

  renderTitle () {
    return (<h1 className={classes.jumbo}>TroutSpotr</h1>)
  }

  renderPreamble () {
    return (<div className={classes.equation}>
      <div>
        <span className={classes.blue}>Trout Streams</span>
      </div>
      <div>
        <span className={classes.plus}>+</span>
        <span className={classes.green}>Public Land</span>
      </div>
      <div>
        <span className={classes.plus}>+</span>
        <span>Public Roads</span>
      </div>
      <hr />
      <div>
        <span className={classes.white}>Safe & Legal Fishing</span>
      </div>
    </div>)
  }

  renderAPP () {
    return (<div className={classes.APP}>
      <p>TroutSpotr is a tool that helps you make <span className={classes.public}>safe and legal choices</span> when fishing for trout.</p>
      <p>However, before you use it, you must <span className={classes.private}>understand and agree</span> to some ground rules first.</p>
    </div>)
  }

  onAdvanceClick = () => {
    const newTime = new Date()
    const time = newTime - this.time
    this.props.advance(time)
  }

  render () {
    return (<div>
      {this.renderTitle()}
      {this.renderPreamble()}
      {this.renderAPP()}
      <Button onClick={this.onAdvanceClick}>Continue to Terms of Service</Button>
    </div>)
  }
}

IntroComponent.propTypes = {'advance': PropTypes.func.isRequired}

export default IntroComponent
