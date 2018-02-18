import * as React from 'react'
import { isEmpty, startsWith } from 'lodash'
import RingWaypointLineComponent from './RingWaypoint.component.line'
import RingWaypointLabelComponent from './RingWaypoint.component.label'
const accessPointClasses = require('./RingWaypoint.accessPoint.scss')
const waypointClasses = require('./RingWaypoint.scss')
import { CROSSING_TYPES } from 'api/GeoApi.accessPoints'

export interface ILayout {
  width: any
  height: any
  radius: any
  arcCompressionRatio: any
  rotatePhase: any
}
export interface IRingWaypointAccessPointComponent {
  accessPoint: any
  projection: any
  selectedAccessPoint: any
  hoveredRoad: any
  roadTypesDictionary: any
  setHoveredRoad: any
  layout: ILayout
}

export class RingWaypointAccessPointComponent extends React.Component<
  IRingWaypointAccessPointComponent
> {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    const gid = this.props.accessPoint.properties.gid
    const { selectedAccessPoint, hoveredRoad } = this.props

    const isSelected =
      isEmpty(selectedAccessPoint) === false && gid === selectedAccessPoint.properties.gid
    const isHovered = isEmpty(hoveredRoad) === false && gid === hoveredRoad.properties.gid

    const nextSelectedAccessPoint = nextProps.selectedAccessPoint
    const nextHoveredRoad = nextProps.hoveredRoad

    const wasSelected =
      isEmpty(nextSelectedAccessPoint) === false && gid === nextSelectedAccessPoint.properties.gid
    const wasHovered = isEmpty(nextHoveredRoad) === false && gid === nextHoveredRoad.properties.gid

    if (isSelected || wasSelected) {
      return true
    }

    if (isHovered || wasHovered) {
      return true
    }
    return false
  }

  renderTargetMarker(dotXScreenCoordinate, dotYScreenCoordinate) {
    return (
      <circle
        className={waypointClasses.target}
        cx={dotXScreenCoordinate}
        cy={dotYScreenCoordinate}
        r="1.5"
      />
    )
  }

  // renderUsHighway(offsetLocationDegrees, radius, width, height, labelOffsetFromRadius) {
  //   return this.renderLabelMarker(offsetLocationDegrees, labelOffsetFromRadius)
  // }

  renderDefaultMarker(text, className) {
    return (
      <g className={className}>
        <circle cx={0} cy={0} r={8} />
        <text textAnchor="middle" x={0} y={4} dominantBaseline="central">
          {text}
        </text>
      </g>
    )
  }

  decideRoadShield(roadType, isSelected) {
    const { alphabetLetter, bridgeType } = roadType.properties
    if (bridgeType === CROSSING_TYPES.publicTrout) {
      return this.renderDefaultMarker(
        alphabetLetter,
        isSelected
          ? accessPointClasses.selectedPublicTroutBridge
          : accessPointClasses.publicTroutBridge
      )
    } else if (bridgeType === CROSSING_TYPES.permissionRequired) {
      return this.renderDefaultMarker(
        alphabetLetter,
        isSelected ? accessPointClasses.selectedTroutBridge : accessPointClasses.troutBridge
      )
    } else if (bridgeType === CROSSING_TYPES.unsafe) {
      return this.renderDefaultMarker(
        alphabetLetter,
        isSelected ? accessPointClasses.selectedUnsafeBridge : accessPointClasses.unsafeBridge
      )
    } else if (bridgeType === CROSSING_TYPES.uninteresting) {
      return null
    }

    return null
  }

  getXCoordinate(radialPosition, labelOffsetFromRadius, width) {
    const result = labelOffsetFromRadius * Math.cos(-Math.PI * 0.5 + radialPosition) + width * 0.5
    return result
  }

  onClick(e) {
    // I swear this is the dumbest thing...
    // But clicking on links in mobile safari added to homescreen
    // Causes it to try to bug out and open a new tab in ios safari.
    // https://www.bennadel.com/blog/2302-preventing-links-in-standalone-iphone-applications-from-opening-in-mobile-safari.htm
    e.preventDefault()
    const hash = `#${this.props.accessPoint.properties.slug}`
    location.href = hash
    return false
  }

  onMouseEnter(e) {
    e.preventDefault()
    this.props.setHoveredRoad(this.props.accessPoint)
  }

  onMouseLeave(e) {
    e.preventDefault()
    this.props.setHoveredRoad(null)
  }

  renderInterstateIcon(num) {
    const asdf = -6
    return (
      <g>
        <use
          className={accessPointClasses.roadSignText}
          xlinkHref="#us-interstate"
          x={asdf}
          y={asdf}
        />
        <text
          className={accessPointClasses.roadSignText}
          textAnchor="middle"
          x={asdf + 6}
          y={asdf + 6}
          dominantBaseline="central"
        >
          {num}
        </text>
      </g>
    )
  }

  renderUsHighwayIcon(num) {
    const asdf = -6
    return (
      <g>
        <use className={accessPointClasses.roadSign} xlinkHref="#us-highway" x={asdf} y={asdf} />
        <text textAnchor="middle" x={asdf + 6} y={asdf + 6} dominantBaseline="central">
          {num}
        </text>
      </g>
    )
  }

  renderMnHighwayIcon(num) {
    const asdf = -6
    return (
      <g>
        <use className={accessPointClasses.roadSign} xlinkHref="#mn-highway" x={asdf} y={asdf} />
        <text
          className={accessPointClasses.roadSignText}
          textAnchor="middle"
          x={asdf + 6}
          y={asdf + 7}
          dominantBaseline="central"
        >
          {num}
        </text>
      </g>
    )
    // Return null
  }

  renderRailroadIcon() {
    const asdf = -6
    // Railroad
    return (
      <g>
        <use className={accessPointClasses.roadSign} xlinkHref="#railroad" x={asdf} y={asdf} />
      </g>
    )
  }

  renderMnStateAidHighway(num) {}

  renderMnTownshipRoad() {}

  renderMnCountyRoad(num) {
    const asdf = -6
    return (
      <g>
        <use className={accessPointClasses.roadSign} xlinkHref="#mn-county" x={asdf} y={asdf} />
        <text
          className={accessPointClasses.roadSignTextDark}
          textAnchor="middle"
          x={asdf + 6}
          y={asdf + 6}
          dominantBaseline="central"
        >
          {num}
        </text>
      </g>
    )
  }

  getYCoordinate(radialPosition, labelOffsetFromRadius, height) {
    const result = labelOffsetFromRadius * Math.sin(-Math.PI * 0.5 + radialPosition) + height * 0.5
    return result
  }

  debuggerInterstate(num) {
    const asdf = -6
    return (
      <g>
        <use className={accessPointClasses.roadSign} xlinkHref="#us-interstate" x={asdf} y={asdf} />
        <text textAnchor="middle" x={asdf + 6} y={asdf + 5} dominantBaseline="central">
          {num}
        </text>
      </g>
    )
  }

  getLabelText() {
    const roadId = this.props.accessPoint.properties.road_type_id
    const streetName = this.props.accessPoint.properties.street_name
    const roadTypeDictionary = this.props.roadTypesDictionary
    const hasRoadType = roadTypeDictionary[roadId] != null
    if (hasRoadType === false) {
      console.warn(`ROAD TYPE NOT FOUND: ${roadId}`) // eslint-disable-line
      console.warn(`roadTypeDictionary: ${roadTypeDictionary}`) // eslint-disable-line
    }

    if (hasRoadType && roadTypeDictionary[roadId].prefix != null) {
      if (roadId === 1) {
        return `${roadTypeDictionary[roadId].prefix} ${
          this.props.accessPoint.properties.road_shield_text
        }`
      }
      if (roadId === 4) {
        return `${roadTypeDictionary[roadId].prefix} ${
          this.props.accessPoint.properties.road_shield_text
        }`
      }

      if (roadId === 5 && startsWith(streetName, roadTypeDictionary[roadId].defaultStart)) {
        return ''
      }

      if (roadId === 7 && startsWith(streetName, roadTypeDictionary[roadId].defaultStart)) {
        return `${roadTypeDictionary[roadId].prefix} ${
          this.props.accessPoint.properties.road_shield_text
        }`
      }
    }
    return this.props.accessPoint.properties.street_name
  }

  getMarkerComponent() {
    // Let externalLink = <use xlinkHref='#externalLink' x={asdf - 4} y={asdf} />
    // Let asdf = -6
    return (
      <g>
        <rect x="-3" y="-0.5" width="5" height="1" />
      </g>
    )
  }

  render() {
    const { accessPoint, projection } = this.props
    const isUninteresting = accessPoint.properties.bridgeType === CROSSING_TYPES.uninteresting
    if (isUninteresting) {
      return null
    }
    const normalizedOffset = accessPoint.properties.linear_offset
    const accessPointWorldCoodinates = {
      latitude: accessPoint.properties.centroid_latitude,
      longitude: accessPoint.properties.centroid_longitude,
    }

    // This is the coordinate of the dot inside the Ring
    const subjectLatitude = accessPointWorldCoodinates.latitude
    const subjectLongitude = accessPointWorldCoodinates.longitude

    const subjectScreenCoordinates = projection([subjectLongitude, subjectLatitude])

    const markerComponent = this.getMarkerComponent()
    const selectedAccessPoint = this.props.selectedAccessPoint
    const hoveredRoad = this.props.hoveredRoad
    const isSelected =
      isEmpty(selectedAccessPoint) === false &&
      accessPoint.properties.gid === selectedAccessPoint.properties.gid
    const isHovered =
      isEmpty(hoveredRoad) === false && accessPoint.properties.gid === hoveredRoad.properties.gid
    const waypointCssClass = isSelected
      ? waypointClasses.selectedWaypoint
      : isHovered ? waypointClasses.hoveredWaypoint : waypointClasses.waypoint
    const iconComponent = this.decideRoadShield(accessPoint, isSelected)
    const hash = `#${accessPoint.properties.slug}`
    return (
      <g>
        <a
          href={hash}
          key={accessPoint.properties.gid}
          className={waypointCssClass}
          onClick={this.onClick}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <RingWaypointLineComponent
            subjectCoordinates={accessPointWorldCoodinates}
            normalizedOffset={normalizedOffset}
            projection={this.props.projection}
            layout={this.props.layout}
          />
          {this.renderTargetMarker(subjectScreenCoordinates[0], subjectScreenCoordinates[1])}
          <RingWaypointLabelComponent
            layout={this.props.layout}
            normalizedOffset={normalizedOffset}
            icon={iconComponent}
            marker={markerComponent}
          />
        </a>
      </g>
    )
  }
}
