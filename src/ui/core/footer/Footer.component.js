import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './Footer.scss'
import {LIST, MAP} from 'ui/core/Core.state'
import {isEmpty} from 'lodash'
import FooterGpsContainer from './Footer.gps.container'
/* eslint-disable react/prefer-stateless-function */
class FooterComponent extends Component {
  render () {
    const {view, selectedStream} = this.props
    const listText = isEmpty(selectedStream) ? 'List' : 'Details'

    const listClass = view === LIST ? classes.selected : classes.item
    const mapClass = view === MAP ? classes.selected : classes.item
    return (<div className={classes.footer}>
      <div className={classes.menu}>
        <button onClick={this.props.setViewToList} className={listClass}>{listText}</button>
        <button onClick={this.props.setViewToMap} className={mapClass}>Map</button>
        <FooterGpsContainer />
      </div>
    </div>)
  }
}

FooterComponent.propTypes = {
  'view': PropTypes.string.isRequired,
  'setViewToMap': PropTypes.func.isRequired,
  'setViewToList': PropTypes.func.isRequired,
  'selectedStream': PropTypes.object,
}

export default FooterComponent
