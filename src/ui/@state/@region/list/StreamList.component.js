import React from 'react'
import PropTypes from 'prop-types'
import classes from './List.scss'
import StreamItemComponent from './streamItem/StreamItem.component'

const StreamListComponent = (props) => {
  const {selectedRegion, selectedState, visibleTroutStreams, getSummary} = props
  return (
    <div className={classes.streamList}>
      {visibleTroutStreams.map((stream, index) => {
        const realStream = stream.stream
        const fakeName = realStream.properties.name
        const url = realStream.properties.slug
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
  'visibleTroutStreams': PropTypes.array.isRequired,
  'selectedState': PropTypes.string.isRequired,
  'selectedRegion': PropTypes.string.isRequired,
  'isListVisible': PropTypes.bool.isRequired,
  'getSummary': PropTypes.func.isRequired,
}

export default StreamListComponent
