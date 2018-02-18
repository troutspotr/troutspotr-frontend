import * as React from 'react'
import StreamComponent from '../stream/Stream.component'
// import { IStreamObject } from 'coreTypes/IStreamObject'
import { Feature, LineString } from 'geojson'
import { IStream } from 'coreTypes/stream/IStream'
import RingWaypointLineComponent from './RingWaypoint.component.line'
import { ILayout } from './RingWaypoint.component.accessPoint'
const streamClasses = require('./RingWaypoint.stream.scss')
const waypointClasses = require('./RingWaypoint.scss')

export interface IRingWaypointStreamComponent {
  stream: Feature<LineString, IStream>
  timing: any
  projection: any
  pathGenerator: any
  layout: ILayout
}

class RingWaypointStreamComponent extends React.Component<IRingWaypointStreamComponent> {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  renderStream(dotXScreenCoordinate, dotYScreenCoordinate, stream) {
    return (
      <g id={'subject'} clipPath="url(#circle-stencil)">
        <g className={streamClasses.tributary}>
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
      </g>
    )
  }

  onClick(e) {
    e.preventDefault()
  }

  renderLabelMarker() {
    return <circle className={streamClasses.icon_tributary} cx={0} cy={0} r="0.001" />
  }

  render() {
    const normalizedOffset = this.props.stream.properties.linear_offset
    const tributaryConfluenceCoordinates = {
      latitude: this.props.stream.properties.centroid_latitude,
      longitude: this.props.stream.properties.centroid_longitude,
    }

    // const streamData = this.props.stream.properties.streamData
    // const { projection } = this.props

    // This is the coordinate of the dot inside the Ring
    // const subjectLatitude = tributaryConfluenceCoordinates.latitude
    // const subjectLongitude = tributaryConfluenceCoordinates.longitude

    // const subjectScreenCoordinates = projection([subjectLongitude, subjectLatitude])

    return (
      <g>
        <a
          onClick={this.onClick}
          className={`${streamClasses.tributaryWaypoint} ${waypointClasses.waypoint}`}
          href={'#'}
        >
          <RingWaypointLineComponent
            subjectCoordinates={tributaryConfluenceCoordinates}
            normalizedOffset={normalizedOffset}
            projection={this.props.projection}
            layout={this.props.layout}
          />
          {/* {this.renderStream(subjectScreenCoordinates[0], subjectScreenCoordinates[1], streamData)} */}
        </a>
      </g>
    )
  }
}

export default RingWaypointStreamComponent
