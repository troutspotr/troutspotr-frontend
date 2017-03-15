import React, { PropTypes } from 'react'
import { take } from 'lodash'
const MAX_STREAMS_TO_SHOW = 3
const SearchResultsOverlayComponent = React.createClass({
  propTypes: {
    troutStreams: PropTypes.array.isRequired,
    onSelectStream: PropTypes.func.isRequired
  },

  renderStreamList (troutStreams) {
    let { onSelectStream } = this.props
    let streams = troutStreams.map(s => {
      let stream = s.stream
      let name = stream.properties.name
      let id = stream.properties.gid
      return (<div key={id} onClick={() => onSelectStream(stream)}>{name}</div>)
    })
    return streams
  },

  renderStreamDetailsOverlay () {
    let { troutStreams } = this.props
    let message = `There are like, ${troutStreams.length} stream(s).`
    let shortList = take(troutStreams, MAX_STREAMS_TO_SHOW)
    let streams = this.renderStreamList(shortList)
    return (
      <div>
        <div>{message}</div>
        <div>{streams}</div>
      </div>)
  },

  componentDidMount () {
    // console.log('LIST VIEW MOUNTED')
  },

  render () {
    return this.renderStreamDetailsOverlay()
  }
})
export default SearchResultsOverlayComponent
