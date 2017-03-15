import React, { PropTypes } from 'react'
import classes from './MapOverlay.scss'
import AccessPointDetails from './AccessPointDetails.component'
import RegionDetails from './RegionDetails.component'
import StreamDetails from './StreamDetails.component'
import MessageOverlay from 'ui/core/messageOverlay/MessageOverlay.component'
import SearchResultsOverlayComponent from './SearchResultsOverlay.component'

import { isEmpty } from 'lodash'

const DetailsOverlayComponent = React.createClass({
  propTypes: {
    visibleTroutStreams: PropTypes.array,
    selectedState: React.PropTypes.string.isRequired,
    selectedRegion: React.PropTypes.string.isRequired,
    selectedAccessPoint: PropTypes.object,
    streamDictionary: PropTypes.object,
    selectedStream: PropTypes.object,
    isSearching: PropTypes.bool.isRequired,
    onSelectStream: PropTypes.func.isRequired
  },

  componentDidMount () {
    // console.log('LIST VIEW MOUNTED')
  },

  renderRegionDetails () {
    let { selectedStream, selectedAccessPoint } = this.props
    let isVisible = isEmpty(selectedStream) && isEmpty(selectedAccessPoint)
    if (isVisible === false) {
      return null
    }

    return (<RegionDetails />)
  },

  renderStreamDetails () {
    let { selectedStream, selectedAccessPoint } = this.props
    let isVisible = isEmpty(selectedStream) === false && isEmpty(selectedAccessPoint)
    if (isVisible === false) {
      return null
    }

    return (<StreamDetails
      selectedStream={selectedStream} />)
  },

  renderAccessPointDetails () {
    let { selectedStream, selectedAccessPoint } = this.props
    let isVisible = isEmpty(selectedStream) === false && isEmpty(selectedAccessPoint) === false
    if (isVisible === false) {
      return null
    }

    return (<AccessPointDetails
      selectedStream={selectedStream}
      selectedAccessPoint={selectedAccessPoint} />)
  },

  renderSearchResults () {
    let { isSearching, visibleTroutStreams, onSelectStream } = this.props
    if (isSearching === false) {
      return null
    }

    return (<MessageOverlay position='top' interactive>
      <div className={classes.container}>
        <SearchResultsOverlayComponent
          troutStreams={visibleTroutStreams}
          onSelectStream={onSelectStream} />
      </div>
    </MessageOverlay>)
  },

  renderDetails () {
    return (<MessageOverlay position='top'>
      <div className={classes.container}>
        {this.renderRegionDetails()}
        {this.renderStreamDetails()}
        {this.renderAccessPointDetails()}
      </div>
    </MessageOverlay>)
  },

  render () {
    if (isEmpty(this.props.visibleTroutStreams)) {
      return null
    }

    let content = this.props.isSearching ? this.renderSearchResults() : this.renderDetails()

    return (
      <MessageOverlay position='top'>
        <div className={classes.container}>
          {content}
        </div>
      </MessageOverlay>)
  }
})
export default DetailsOverlayComponent
