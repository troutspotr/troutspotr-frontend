import React, { PropTypes } from 'react'
import classes from './NoResultsFoundOverlay.scss'
import MessageOverlay from 'ui/core/messageOverlay/MessageOverlay.component'
import { isEmpty } from 'lodash'
const RegionLayout = React.createClass({
  propTypes: {
    clearText: PropTypes.func.isRequired,
    totalStreams: PropTypes.array.isRequired,
    isDisplayed: PropTypes.bool.isRequired
  },

  renderNoStreamsFound () {
    let { totalStreams, clearText } = this.props
    let safeStreamCount = isEmpty(totalStreams) ? 0 : totalStreams.length
    return (
      <div>
        <div className={classes.clearSearchTitle}>No streams matched your search.</div>
        <div>
          <button onClick={clearText} className={classes.actionButton}>Clear your search</button> to see {safeStreamCount} streams.
        </div>
      </div>)
  },

  render () {
    if (this.props.isDisplayed === false) {
      return null
    }

    return (
      <MessageOverlay
        position='top' >
        {this.renderNoStreamsFound()}
      </MessageOverlay>)
  }
})
export default RegionLayout
