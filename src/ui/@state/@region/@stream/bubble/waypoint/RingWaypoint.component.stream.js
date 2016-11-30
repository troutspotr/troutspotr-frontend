import React, { PropTypes } from 'react'
import StreamComponent from '../stream/Stream.component'
import RingWaypointLineComponent from './RingWaypoint.component.line'
import RingWaypointLabelComponent from './RingWaypoint.component.label'

import streamClasses from './RingWaypoint.stream.scss'
import waypointClasses from './RingWaypoint.scss'

const RingWaypointStreamComponent = React.createClass({
  propTypes: {
    stream: PropTypes.object.isRequired,
    timing: PropTypes.object.isRequired,
    projection: PropTypes.func.isRequired,
    pathGenerator: PropTypes.func.isRequired,
    layout: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      radius: PropTypes.number.isRequired,
      arcCompressionRatio: PropTypes.number.isRequired,
      rotatePhase: PropTypes.number.isRequired
    })
  },

  // className={waypointClasses.accessPointDot + ' ' + waypointClasses.subjectAccessPointDot}
  renderStream (dotXScreenCoordinate, dotYScreenCoordinate, stream) {
    return (<g id={'subject'} clipPath='url(#circle-stencil)'>
      <g className={streamClasses.tributary} >
        <StreamComponent
          timing={this.props.timing}
          streamPackage={stream}
          pathGenerator={this.props.pathGenerator}
          projection={this.props.projection}
          index={3}
          layout={this.props.layout} />
      </g>
      <circle
        className={waypointClasses.target}
        cx={dotXScreenCoordinate}
        cy={dotYScreenCoordinate}
        r='1' />
    </g>)
  },

  onClick (e) {
    e.preventDefault()
  },

  renderLabelMarker () {
    return <circle
      className={streamClasses.icon_tributary}
      cx={0}
      cy={0}
      r='8' />
  },

  render () {
    let normalizedOffset = this.props.stream.properties.linear_offset
    let tributaryConfluenceCoordinates = {
      latitude: this.props.stream.properties.centroid_latitude,
      longitude: this.props.stream.properties.centroid_longitude
    }

    let streamData = this.props.stream.properties.streamData
    debugger
    let labelText = streamData.stream.properties.name

    let { projection } = this.props

    // this is the coordinate of the dot inside the Ring
    let subjectLatitude = tributaryConfluenceCoordinates.latitude
    let subjectLongitude = tributaryConfluenceCoordinates.longitude

    let subjectScreenCoordinates = projection([subjectLongitude, subjectLatitude])

    // let cssName = svgBubbleClasses.accessPoint
    // return the root object that allows hovering, highlighting, etc.
    let icon = this.renderLabelMarker()
    let marker = <rect x='-3' y='-0.5' width='5' height='1' />
    return <g>
      <a
        onClick={this.onClick}
        className={streamClasses.tributaryWaypoint + ' ' + waypointClasses.waypoint}
        xlinkHref={'#'}>
        <RingWaypointLineComponent
          subjectCoordinates={tributaryConfluenceCoordinates}
          normalizedOffset={normalizedOffset}
          projection={this.props.projection}
          layout={this.props.layout} />
        {this.renderStream(subjectScreenCoordinates[0], subjectScreenCoordinates[1], streamData)}
        <RingWaypointLabelComponent
          layout={this.props.layout}
          normalizedOffset={normalizedOffset}
          marker={marker}
          icon={icon}
          labelText={labelText} />
      </a>
    </g>
  }
})

export default RingWaypointStreamComponent
