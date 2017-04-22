import React from 'react'
import classes from './List.scss'
// import BubbleComponent from './Bubble.component'
import StreamItemContainer from './streamItem/StreamItem.container'

const StreamListComponent = (props) => {
  let { selectedRegion, selectedState, visibleTroutStreams } = props
  return (
    <div className={classes.streamList}>
      {visibleTroutStreams.map((stream, index) => {
        let realStream = stream.stream
        let fakeName = realStream.properties.name
        let url = realStream.properties.slug
        return (
          <div key={realStream.properties.slug}>
            <StreamItemContainer
              title={fakeName}
              url={`/${selectedState}/${selectedRegion}/${url}`}
              streamObject={stream}
            />
          </div>)
      })
      }
    </div>)
}

StreamListComponent.propTypes = {
  visibleTroutStreams: React.PropTypes.array.isRequired,
  selectedState: React.PropTypes.string.isRequired,
  selectedRegion: React.PropTypes.string.isRequired
}

export default StreamListComponent
