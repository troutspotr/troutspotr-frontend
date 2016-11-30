/* eslint max-len: 0 */
import React, { PropTypes } from 'react'
import classes from './SvgBubble.scss'
import * as d3 from 'd3-geo'
import { concat, sortBy } from 'lodash'
import StreamComponent from './stream/Stream.component'
import { getProjectionFromFeature, getTiming } from './SvgBubble.selectors'
import RingComponent from './ring/Ring.component'
import RingWaypointAccessPointComponent from './waypoint/RingWaypoint.component.accessPoint'
import RingWaypointStreamComponent from './waypoint/RingWaypoint.component.stream'

const DIMENSIONS = 500
const SQUISH_FACTOR = 0.95
const ROTATE_PHASE = Math.PI / 2
const RADIUS = 160

const SvgBubbleComponent = React.createClass({
  propTypes: {
    streamPackage: React.PropTypes.shape({
      stream: PropTypes.object.isRequired,
      sections: PropTypes.array.isRequired,
      restrictions: PropTypes.array.isRequired,
      palSections: PropTypes.array.isRequired,
      accessPoints: PropTypes.array.isRequired,
      tributaries: PropTypes.array.isRequired,
      circle: PropTypes.object.isRequired
    }).isRequired,
    index: PropTypes.number.isRequired
  },

  componentWillMount () {
    this.width = DIMENSIONS
    this.height = DIMENSIONS

    this.projection = getProjectionFromFeature(this.props.streamPackage.circle,
        { width: DIMENSIONS, height: DIMENSIONS, radius: RADIUS })

    this.pathGenerator = d3.geoPath()
      .projection(this.projection)
      .pointRadius(1)

    this.layout = {
      width: this.width,
      height: this.height,
      radius: RADIUS,
      arcCompressionRatio: SQUISH_FACTOR,
      rotatePhase: ROTATE_PHASE
    }

    this.timing = getTiming(this.props)
  },

  componentWillUnmount () {

  },

  renderWaypoints () {
    let { accessPoints, tributaries } = this.props.streamPackage
    let waypoints = sortBy(concat(accessPoints, tributaries), 'properties.linear_offset')

    return waypoints.map((waypoint, index) => {
      let isAccessPoint = waypoint.properties.street_name != null
      return isAccessPoint
        ? this.renderAccessPoint(waypoint, index)
        : this.renderTributary(waypoint, index)
    })
  },

  renderOuterCircleAxis () {
    return <RingComponent
      timing={this.timing}
      streamPackage={this.props.streamPackage}
      pathGenerator={this.pathGenerator}
      index={this.props.index}
      layout={this.layout} />
  },

  renderAccessPoints () {
    return this.props.streamPackage.accessPoints.map(this.renderAccessPoint)
  },

  renderAccessPoint (accessPoint, accessPointsIndex) {
    return <RingWaypointAccessPointComponent
      accessPoint={accessPoint}
      key={accessPoint.properties.gid}
      timing={this.timing}
      projection={this.projection}
      layout={this.layout} />
  },

  renderTributaries () {
    return this.props.streamPackage.tributaries.map(this.renderTributary)
  },

  renderTributary (tributary, tributaryIndex) {
    return <RingWaypointStreamComponent
      stream={tributary}
      key={tributary.properties.gid}
      timing={this.timing}
      projection={this.projection}
      pathGenerator={this.pathGenerator}
      layout={this.layout} />
  },

  render () {
    let name = this.props.streamPackage.stream.properties.name
    let id = this.props.streamPackage.stream.properties.gid
    return (
      <div className={classes.container}>
        <svg
          viewBox={`0 0 ${this.width} ${this.height}`}
          preserveAspectRatio='xMinYMin meet'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          id={'trout_stream_' + name + '_' + id} >
          <title>{name} {id}</title>
          <defs>
            <clipPath id='circle-stencil'>
              <circle cx={this.width / 2} cy={this.height / 2} r={RADIUS - 3} />
            </clipPath>
          </defs>
          <g id='stream' clipPath='url(#circle-stencil)'>
            <StreamComponent
              streamPackage={this.props.streamPackage}
              pathGenerator={this.pathGenerator}
              projection={this.projection}
              timing={getTiming(this.props)}
              index={this.props.index}
              layout={this.layout} />
          </g>
          {this.renderOuterCircleAxis()}
          <g id={'waypoints_' + id}>
            {this.renderWaypoints()}
          </g>
          }
        </svg>
      </div>
    )
  }
})

export default SvgBubbleComponent
