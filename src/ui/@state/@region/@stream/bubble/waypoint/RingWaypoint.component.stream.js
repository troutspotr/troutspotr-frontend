import React, {Component} from 'react'
import PropTypes from 'prop-types'
import StreamComponent from '../stream/Stream.component'
import RingWaypointLineComponent from './RingWaypoint.component.line'
// Import RingWaypointLabelComponent from './RingWaypoint.component.label'

import streamClasses from './RingWaypoint.stream.scss'
import waypointClasses from './RingWaypoint.scss'
class RingWaypointStreamComponent extends Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }
  // ClassName={waypointClasses.accessPointDot + ' ' + waypointClasses.subjectAccessPointDot}
  renderStream (dotXScreenCoordinate, dotYScreenCoordinate, stream) {
    return (<g id={'subject'} clipPath="url(#circle-stencil)">
      <g className={streamClasses.tributary} >
        <StreamComponent
          timing={this.props.timing}
          streamPackage={stream}
          pathGenerator={this.props.pathGenerator}
          projection={this.props.projection}
          index={3}
          layout={this.props.layout}
        />
      </g>
      <circle
        className={waypointClasses.target}
        cx={dotXScreenCoordinate}
        cy={dotYScreenCoordinate}
        r="1.5"
      />
    </g>)
  }

  onClick (e) {
    e.preventDefault()
  }

  renderLabelMarker () {
    return (<circle
      className={streamClasses.icon_tributary}
      cx={0}
      cy={0}
      r="0.001"
    />)
  }

  render () {
    const normalizedOffset = this.props.stream.properties.linear_offset
    const tributaryConfluenceCoordinates = {
      'latitude': this.props.stream.properties.centroid_latitude,
      'longitude': this.props.stream.properties.centroid_longitude,
    }

    const streamData = this.props.stream.properties.streamData
    // Let labelText = streamData.stream.properties.name

    const {projection} = this.props

    // This is the coordinate of the dot inside the Ring
    const subjectLatitude = tributaryConfluenceCoordinates.latitude
    const subjectLongitude = tributaryConfluenceCoordinates.longitude

    const subjectScreenCoordinates = projection([
      subjectLongitude,
      subjectLatitude,
    ])

    // Let cssName = svgBubbleClasses.accessPoint
    // Return the root object that allows hovering, highlighting, etc.
    // Let icon = this.renderLabelMarker()
    // Let marker = <rect x='-3' y='-0.5' width='5' height='1' />
    // Let icon = null
    // Let marker = null
    // Return null
    return (<g>
      <a
        onClick={this.onClick}
        className={`${streamClasses.tributaryWaypoint} ${waypointClasses.waypoint}`}
        xlinkHref={'#'}
      >
        <RingWaypointLineComponent
          subjectCoordinates={tributaryConfluenceCoordinates}
          normalizedOffset={normalizedOffset}
          projection={this.props.projection}
          layout={this.props.layout}
        />
        {this.renderStream(subjectScreenCoordinates[0], subjectScreenCoordinates[1], streamData)}
      </a>
    </g>)
  }
}

RingWaypointStreamComponent.propTypes = {
  'stream': PropTypes.object.isRequired,
  'timing': PropTypes.object.isRequired,
  'projection': PropTypes.func.isRequired,
  'pathGenerator': PropTypes.func.isRequired,
  'layout': PropTypes.shape({
    'width': PropTypes.number.isRequired,
    'height': PropTypes.number.isRequired,
    'radius': PropTypes.number.isRequired,
    'arcCompressionRatio': PropTypes.number.isRequired,
    'rotatePhase': PropTypes.number.isRequired,
  }),
}

export default RingWaypointStreamComponent
