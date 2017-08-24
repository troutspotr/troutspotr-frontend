import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './Agreement.scss'

class IntroComponent extends Component {
  componentDidMount () {
    this.time = new Date()
  }

  renderTitle () {
    return (<div className={classes.jumbo}>TroutSpotr</div>)
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
      <button className={classes.button} onClick={this.onAdvanceClick}>Continue to Terms of Service</button>
    </div>)
  }
}

IntroComponent.propTypes = {'advance': PropTypes.func.isRequired}

export default IntroComponent
