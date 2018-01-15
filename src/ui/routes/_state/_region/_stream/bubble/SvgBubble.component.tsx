/* eslint max-len: 0 */
import * as React from 'react'
// const classes = require('./SvgBubble.scss')
// import * as d3 from 'd3-geo'
// import { concat, sortBy } from 'lodash'
// import StreamComponent from './stream/Stream.component'
// import { getProjectionFromFeature, getTiming } from './SvgBubble.selectors'
// import RingComponent from './ring/Ring.component'
// import RingWaypointAccessPointContainer from './waypoint/RingWaypoint.container.accessPoint'
// import RingWaypointStreamComponent from './waypoint/RingWaypoint.component.stream'

// const DIMENSIONS = 300
// const SQUISH_FACTOR = 0.9
// const ROTATE_PHASE = Math.PI / 2
// const RADIUS = DIMENSIONS / 2 - 50
class SvgBubbleComponent extends React.Component<any> {
  // shouldComponentUpdate (nextProps) {
  //   return true
  // }

  // componentWillUpdate (nextProps) {
  //   this.projection = getProjectionFromFeature(nextProps.streamPackage.circle,
  //     {'width': DIMENSIONS, 'height': DIMENSIONS, 'radius': RADIUS})

  //   this.pathGenerator = d3.geoPath()
  //     .projection(this.projection)
  //     .pointRadius(1)
  // }

  // componentWillMount () {
  //   this.width = DIMENSIONS
  //   this.height = DIMENSIONS

  //   this.projection = getProjectionFromFeature(this.props.streamPackage.circle,
  //     {'width': DIMENSIONS, 'height': DIMENSIONS, 'radius': RADIUS})

  //   this.pathGenerator = d3.geoPath()
  //     .projection(this.projection)
  //     .pointRadius(1)

  //   this.layout = {
  //     'width': this.width,
  //     'height': this.height,
  //     'radius': RADIUS,
  //     'arcCompressionRatio': SQUISH_FACTOR,
  //     'rotatePhase': ROTATE_PHASE,
  //   }

  //   this.timing = getTiming(this.props)
  // }

  // componentWillUnmount () {

  // }

  // renderWaypoints () {
  //   const {accessPoints, tributaries} = this.props.streamPackage
  //   const waypoints = sortBy(concat(accessPoints, tributaries), 'properties.linear_offset')

  //   return waypoints.map((waypoint, index) => {
  //     const {gid, street_name} = waypoint.properties
  //     /* eslint-disable camelcase */
  //     const isAccessPoint = street_name != null
  //     /* eslint-enable camelcase */
  //     return isAccessPoint
  //       ? this.renderAccessPoint(waypoint, gid)
  //       : this.renderTributary(waypoint, gid)
  //   })
  // }

  // renderOuterCircleAxis () {
  //   return (<RingComponent
  //     timing={this.timing}
  //     streamPackage={this.props.streamPackage}
  //     pathGenerator={this.pathGenerator}
  //     index={this.props.index}
  //     layout={this.layout}
  //   />)
  // }

  // renderAccessPoints () {
  //   return this.props.streamPackage.accessPoints.map((item, index) => this.renderAccessPoint(item, index))
  // }

  // renderAccessPoint (accessPoint, accessPointsIndex) {
  //   return (<RingWaypointAccessPointContainer
  //     accessPoint={accessPoint}
  //     key={accessPointsIndex}
  //     timing={this.timing}
  //     projection={this.projection}
  //     layout={this.layout}
  //   />)
  // }

  // renderTributaries () {
  //   return this.props.streamPackage.tributaries.map(this.renderTributary)
  // }

  // renderTributary (tributary, tributaryIndex) {
  //   return (<RingWaypointStreamComponent
  //     stream={tributary}
  //     key={tributary.properties.gid}
  //     timing={this.timing}
  //     projection={this.projection}
  //     pathGenerator={this.pathGenerator}
  //     layout={this.layout}
  //   />)
  // }

  render() {
    return null
    // const name = this.props.streamPackage.stream.properties.name
    // const id = this.props.streamPackage.stream.properties.gid
    // return (
    //   <div className={classes.container}>
    //     <svg
    //       className={classes.svgContainer}
    //       viewBox={`0 0 ${this.width} ${this.height}`}
    //       preserveAspectRatio="xMinYMin meet"
    //       version="1.1"
    //       xmlns="http://www.w3.org/2000/svg"
    //       id={`trout_stream_${name}_${id}`}
    //     >
    //       <title>{name} {id}</title>
    //       <defs>
    //         <clipPath id="circle-stencil">
    //           <circle cx={this.width / 2} cy={this.height / 2} r={RADIUS - 3} />
    //         </clipPath>
    //       </defs>
    //       <g id="stream" clipPath="url(#circle-stencil)">
    //         <StreamComponent
    //           streamPackage={this.props.streamPackage}
    //           pathGenerator={this.pathGenerator}
    //           projection={this.projection}
    //           timing={getTiming(this.props)}
    //           index={this.props.index}
    //           layout={this.layout}
    //         />
    //       </g>
    //       {this.renderOuterCircleAxis()}
    //       <g id={`waypoints_${id}`}>
    //         {this.renderWaypoints()}
    //       </g>
    //     </svg>
    //   </div>
    // )
  }
}

// SvgBubbleComponent.propTypes = {
//   'streamPackage': PropTypes.shape({
//     'stream': PropTypes.object.isRequired,
//     'sections': PropTypes.array.isRequired,
//     'restrictions': PropTypes.array.isRequired,
//     'palSections': PropTypes.array.isRequired,
//     'accessPoints': PropTypes.array.isRequired,
//     'tributaries': PropTypes.array.isRequired,
//     'circle': PropTypes.object.isRequired,
//   }).isRequired,
//   'index': PropTypes.number.isRequired,
// }

export default SvgBubbleComponent
