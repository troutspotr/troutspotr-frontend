import React from 'react'
import classes from './List.scss'
import StreamItemComponent from './streamItem/StreamItem.component'

const StreamListComponent = (props) => {
  let { selectedRegion, selectedState, visibleTroutStreams, getSummary } = props
  return (
    <div className={classes.streamList}>
      {visibleTroutStreams.map((stream, index) => {
        let realStream = stream.stream
        let fakeName = realStream.properties.name
        let url = realStream.properties.slug
        return (
          <div key={realStream.properties.slug}>
            <StreamItemComponent
              getSummary={getSummary}
              title={fakeName}
              url={`/${selectedState}/${selectedRegion}/${url}`}
              streamObject={stream}
              isVisible={props.isListVisible}
            />
          </div>)
      })
      }
    </div>)
}

StreamListComponent.propTypes = {
  visibleTroutStreams: React.PropTypes.array.isRequired,
  selectedState: React.PropTypes.string.isRequired,
  selectedRegion: React.PropTypes.string.isRequired,
  isListVisible: React.PropTypes.bool.isRequired,
  getSummary: React.PropTypes.func.isRequired
}

export default StreamListComponent
