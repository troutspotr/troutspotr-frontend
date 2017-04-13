import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import classes from './Footer.scss'
import { MAP, LIST } from 'ui/core/Core.state'
import { isEmpty } from 'lodash'
/* eslint-disable react/prefer-stateless-function */
class FooterComponent extends Component {
  render () {
    let { view, selectedStream } = this.props
    let listText = isEmpty(selectedStream) ? 'List' : 'Details'

    let listClass = view === LIST ? classes.selected : classes.item
    let mapClass = view === MAP ? classes.selected : classes.item
    return (<div className={classes.footer}>
      <div className={classes.menu}>
        <span onClick={this.props.setViewToList} className={listClass}>{listText}</span>
        <span onClick={this.props.setViewToMap} className={mapClass}>Map</span>
        <Link to={'/'} className={classes.help}>Help</Link>
      </div>
    </div>)
  }
}

FooterComponent.propTypes = {
  view: PropTypes.string.isRequired,
  setViewToMap: PropTypes.func.isRequired,
  setViewToList: PropTypes.func.isRequired,
  selectedStream: PropTypes.object
}

export default FooterComponent
