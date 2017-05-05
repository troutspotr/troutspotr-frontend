import React, { PropTypes } from 'react'
import classes from './MicroMap.scss'

import MicroMapStreamComponent from './MicroMap.stream.component'
import MicroMapGpsContainer from './MicroMap.gps.container'
const IS_GPS_VISIBLE = false
const MicroMapComponent = (props) => {
  return (
    <div className={classes.container}>
      <MicroMapStreamComponent
        id={`${props.id}_stream`}
        isVisible={props.isVisible}
        streamObject={props.streamObject}
      />
      {IS_GPS_VISIBLE && props.isGpsActive &&
      <MicroMapGpsContainer
        id={`${props.id}_gps`}
        isVisible={props.isVisible}
        streamObject={props.streamObject}
      /> }
    </div>)
}

MicroMapComponent.propTypes = {
  streamObject: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  isGpsActive: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired
}

export default MicroMapComponent
