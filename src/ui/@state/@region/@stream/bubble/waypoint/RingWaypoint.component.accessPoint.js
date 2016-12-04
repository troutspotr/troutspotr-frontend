import React, { PropTypes } from 'react'
import { startsWith, isEmpty } from 'lodash'
import RingWaypointLineComponent from './RingWaypoint.component.line'
import RingWaypointLabelComponent from './RingWaypoint.component.label'

import accessPointClasses from './RingWaypoint.accessPoint.scss'
import waypointClasses from './RingWaypoint.scss'
export const crossingTypes = {
  publicTrout: 'publicTrout',
  permissionRequired: 'permissionRequired',
  unsafe: 'unsafe',
  uninteresting: 'uninteresting'
}
const RingWaypointAccessPointComponent = React.createClass({
  propTypes: {
    accessPoint: PropTypes.object.isRequired,
    timing: PropTypes.object.isRequired,
    projection: PropTypes.func.isRequired,
    selectedAccessPoint: PropTypes.object,
    hoveredRoad: PropTypes.object,
    setSelectedRoad: PropTypes.func.isRequired,
    setHoveredRoad: PropTypes.func.isRequired,
    layout: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      radius: PropTypes.number.isRequired,
      arcCompressionRatio: PropTypes.number.isRequired,
      rotatePhase: PropTypes.number.isRequired
    })
  },

  renderTargetMarker (dotXScreenCoordinate, dotYScreenCoordinate) {
    return <circle
      className={waypointClasses.target}
      cx={dotXScreenCoordinate}
      cy={dotYScreenCoordinate}
      r='1' />
  },

  renderUsHighway (offsetLocationDegrees, radius, width, height, labelOffsetFromRadius) {
    return this.renderLabelMarker(offsetLocationDegrees, labelOffsetFromRadius)
  },

  renderDefaultMarker (text, className) {
    return (<g className={className}>
      <circle
        cx={0}
        cy={0}
        r={8} />
      <text
        textAnchor='middle' x={0} y={4}
        dominantBaseline='central'>{text}</text>
    </g>)
  },

  decideRoadShield (roadType, isSelected) {
    let { alphabetLetter, bridgeType } = roadType.properties
    if (bridgeType === crossingTypes.publicTrout) {
      return this.renderDefaultMarker(alphabetLetter, isSelected ? accessPointClasses.selectedPublicTroutBridge : accessPointClasses.publicTroutBridge)
    } else if (bridgeType === crossingTypes.permissionRequired) {
      return this.renderDefaultMarker(alphabetLetter, isSelected ? accessPointClasses.selectedTroutBridge : accessPointClasses.troutBridge)
    } else if (bridgeType === crossingTypes.unsafe) {
      return this.renderDefaultMarker(alphabetLetter, isSelected ? accessPointClasses.selectedUnsafeBridge : accessPointClasses.unsafeBridge)
    } else if (bridgeType === crossingTypes.uninteresting) {
      return this.renderDefaultMarker(alphabetLetter, isSelected ? accessPointClasses.selectedUninterestingBridge : accessPointClasses.uninterestingBridge)
    }
    // return this.renderDefaultMarker
  },

  getXCoordinate (radialPosition, labelOffsetFromRadius, width) {
    let result = labelOffsetFromRadius * Math.cos((-Math.PI * 0.5) + radialPosition) + (width * 0.5)
    return result
  },

  onClick (e) {
    e.preventDefault()
    this.props.setSelectedRoad(this.props.accessPoint)
  },

  onMouseEnter (e) {
    e.preventDefault()
    this.props.setHoveredRoad(this.props.accessPoint)
  },

  onMouseLeave (e) {
    e.preventDefault()
    this.props.setHoveredRoad(null)
  },

  renderInterstateIcon (number) {
    let asdf = -6
    return <g>
      <use className={accessPointClasses.roadSignText} xlinkHref='#us-interstate' x={asdf} y={asdf} />
      <text
        className={accessPointClasses.roadSignText}
        textAnchor='middle'
        x={asdf + 6}
        y={asdf + 6}
        dominantBaseline='central' >{number}</text>
    </g>
  },

  renderUsHighwayIcon (number) {
    let asdf = -6
    return (<g>
      <use className={accessPointClasses.roadSign} xlinkHref='#us-highway' x={asdf} y={asdf} />
      <text textAnchor='middle' x={asdf + 6} y={asdf + 6} dominantBaseline='central'>{number}</text>
    </g>)
  },

  renderMnHighwayIcon (number) {
    let asdf = -6
    return (<g>
      <use className={accessPointClasses.roadSign} xlinkHref='#mn-highway' x={asdf} y={asdf} />
      <text
        className={accessPointClasses.roadSignText}
        textAnchor='middle' x={asdf + 6} y={asdf + 7}
        dominantBaseline='central'>{number}</text>
    </g>)
    // return null
  },

  renderRailroadIcon () {
    let asdf = -6
    // railroad
    return (<g>
      <use className={accessPointClasses.roadSign} xlinkHref='#railroad' x={asdf} y={asdf} />
    </g>)
  },

  renderMnStateAidHighway (number) {

  },

  renderMnTownshipRoad () {

  },

  renderMnCountyRoad (number) {
    let asdf = -6
    return (<g>
      <use className={accessPointClasses.roadSign} xlinkHref='#mn-county' x={asdf} y={asdf} />
      <text
        className={accessPointClasses.roadSignTextDark}
        textAnchor='middle'
        x={asdf + 6}
        y={asdf + 6}
        dominantBaseline='central'>{number}</text>
    </g>)
  },

  getYCoordinate (radialPosition, labelOffsetFromRadius, height) {
    let result = labelOffsetFromRadius * Math.sin((-Math.PI * 0.5) + radialPosition) + (height * 0.5)
    return result
  },

  debuggerInterstate (number) {
    let asdf = -6
    return (<g>
      <use className={accessPointClasses.roadSign} xlinkHref='#us-interstate' x={asdf} y={asdf} />
      <text textAnchor='middle' x={asdf + 6} y={asdf + 5} dominantBaseline='central'>{number}</text>
    </g>)
  },

  getLabelText () {
    let roadId = this.props.accessPoint.properties.road_type_id
    let streetName = this.props.accessPoint.properties.street_name
    if (roadTypeDictionary[roadId].prefix != null) {
      if (roadId === 1) {
        return `${roadTypeDictionary[roadId].prefix} ${this.props.accessPoint.properties.road_shield_text}`
      }
      if (roadId === 4) {
        return `${roadTypeDictionary[roadId].prefix} ${this.props.accessPoint.properties.road_shield_text}`
      }

      if (roadId === 5 && startsWith(streetName, roadTypeDictionary[roadId].defaultStart)) {
        return ''
      }

      if (roadId === 7 && startsWith(streetName, roadTypeDictionary[roadId].defaultStart)) {
        return `${roadTypeDictionary[roadId].prefix} ${this.props.accessPoint.properties.road_shield_text}`
      }

      // console.log(this.props.accessPoint.properties.street_name, this.props.accessPoint.properties.road_type_id)
      // return `${roadTypeDictionary[roadId].prefix} ${this.props.accessPoint.properties.road_shield_text}`
    }
    return this.props.accessPoint.properties.street_name
  },

  getMarkerComponent () {
    // let externalLink = <use xlinkHref='#externalLink' x={asdf - 4} y={asdf} />
    // let asdf = -6
    return (<g>
      <rect x='-3' y='-0.5' width='5' height='1' />
    </g>)
  },

  render () {
    let { accessPoint, projection } = this.props
    let isUninteresting = accessPoint.properties.bridgeType === crossingTypes.uninteresting
    if (isUninteresting) {
      return null
    }
    let normalizedOffset = accessPoint.properties.linear_offset
    let accessPointWorldCoodinates = {
      latitude: accessPoint.properties.centroid_latitude,
      longitude: accessPoint.properties.centroid_longitude
    }

    // this is the coordinate of the dot inside the Ring
    let subjectLatitude = accessPointWorldCoodinates.latitude
    let subjectLongitude = accessPointWorldCoodinates.longitude

    let subjectScreenCoordinates = projection([subjectLongitude, subjectLatitude])
    let labelText = this.getLabelText()

    let markerComponent = this.getMarkerComponent()
    // let roadType = this.props.accessPoint.properties.road_type_id
    // let roadNumber = this.props.accessPoint.properties.road_shield_text
    // let isBoring = this.props.accessPoint.properties.is_over_trout_stream !== 1
    let selectedAccessPoint = this.props.selectedAccessPoint
    let hoveredRoad = this.props.hoveredRoad
    let isSelected = isEmpty(selectedAccessPoint) === false && accessPoint.properties.gid === selectedAccessPoint.properties.gid
    let isHovered = isEmpty(hoveredRoad) === false && accessPoint.properties.gid === hoveredRoad.properties.gid
    // let isHovered = false
    // let isSelected = true

    // let waypointCssClass = isBoring ? waypointClasses.waypointBoring : waypointClasses.waypoint
    let waypointCssClass = isSelected ? waypointClasses.selectedWaypoint : isHovered ? waypointClasses.hoveredWaypoint  : waypointClasses.waypoint
    let iconComponent = this.decideRoadShield(accessPoint, isSelected)
    return (<g>
      <a
        className={waypointCssClass}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        xlinkHref={'#'}>
        <RingWaypointLineComponent
          subjectCoordinates={accessPointWorldCoodinates}
          normalizedOffset={normalizedOffset}
          projection={this.props.projection}
          layout={this.props.layout} />
        {this.renderTargetMarker(subjectScreenCoordinates[0], subjectScreenCoordinates[1])}
        <RingWaypointLabelComponent
          layout={this.props.layout}
          projection={this.props.projection}
          normalizedOffset={normalizedOffset}
          labelText={labelText}
          icon={iconComponent}
          marker={markerComponent}
          />
      </a>
    </g>)
  }
})

export default RingWaypointAccessPointComponent

const roadTypeDictionary = {
  '1': {
    shortName: 'Interstate',
    longName: 'Interstate Highway',
    prefix: 'Interstate',
    defaultStart: 'ISTH '
  },
  '2': {
    shortName: 'US Highway',
    longName: 'US Highway',
    prefix: 'US Highway'
  },
  '3': {
    shortName: 'US Railroad',
    longName: 'Railroad',
    prefix: 'Railroad'
  },
  '4': {
    shortName: 'MN_State_Highway',
    longName: 'MN Highway',
    prefix: 'MN Highway'
  },
  '5': {
    shortName: 'MN_County_State_Aid_Highway',
    longName: 'County State Aid Highway (CSAH)',
    prefix: 'County Highway',
    defaultStart: 'CSAH '
  },
  '6': {
    shortName: 'MN_Municipal_State_Aid_Street',
    longName: 'Municipal State Aid Street (MSAS)',
    prefix: 'Municipal Street'
  },
  '7': {
    shortName: 'MN_County_Road',
    longName: 'County Road',
    prefix: 'County Road',
    defaultStart: 'CR-'
  },
  '8': {
    shortName: 'MN_Township_Road',
    longName: 'Township Road'
  },
  '9': {
    shortName: 'MN_Unorganized_Territory_Road',
    longName: 'Unorganized Territory Road'
  },
  '10': {
    shortName: 'MN_Military_Road',
    longName: 'Military Road'
  },
  '11': {
    shortName: 'MN_Tribal_Road',
    longName: 'Tribal Road'
  },
  '12': {
    shortName: 'MN_State_Forest_Road',
    longName: 'State Forest Road'
  },
  '13': {
    shortName: 'MN_State_Park_Road',
    longName: 'State Park Road'
  },
  '14': {
    shortName: 'MN_National_Forest_Road',
    longName: 'National Forest Road'
  },
  '15': {
    shortName: 'MN_National_Park_Road',
    longName: 'National Park Road'
  },
  '16': {
    shortName: 'MN_Misc_Road',
    longName: 'Uncategorized MN Road'
  }
}
