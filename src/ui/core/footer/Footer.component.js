import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classes from './Footer.scss'
import { MAP, LIST } from 'ui/@state/@region/Region.state'
import { isEmpty } from 'lodash'

const FooterComponent = React.createClass({
  propTypes: {
    params:  PropTypes.object.isRequired,
    view: PropTypes.string.isRequired,
    setViewToMap: PropTypes.func.isRequired,
    setViewToList: PropTypes.func.isRequired,
    selectedStream: PropTypes.object
  },

  copyUrlToClipboard() {
    let tempUrlTextArea = document.createElement('textarea')
    tempUrlTextArea.value = window.location.href

    document.body.appendChild(tempUrlTextArea);
    tempUrlTextArea.select();

    let copyButton = document.getElementById('copyToClipboard')

    try {
      let success = document.execCommand('copy');
      copyButton.innerHTML = 'Copied!'
    } catch (error) {
      copyButton.innerHTML = '&Oslash;'
    }

    document.body.removeChild(tempUrlTextArea);

  },

  render () {
    let { view, selectedStream } = this.props
    let listText = isEmpty(selectedStream) ? 'List' : 'Details'
    return (<div className={classes.footer}>
      <div className={classes.menu}>
        <button onClick={this.props.setViewToList} className={view === LIST ? classes.selected : classes.item}>{listText}</button>
        <button onClick={this.props.setViewToMap} className={view === MAP ? classes.selected : classes.item}>Map</button>
        <button onClick={this.copyUrlToClipboard} id="copyToClipboard" className={classes.copy}>Copy</button>
      </div>
    </div>)
  }
})
export default FooterComponent
