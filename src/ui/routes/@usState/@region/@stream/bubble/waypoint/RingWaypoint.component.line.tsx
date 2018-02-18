import * as React from 'react'
import PropTypes from 'prop-types'
import { flatten, map } from 'lodash'
import { ILayout } from './RingWaypoint.component.accessPoint'
// Import classes from '../SvgBubble.scss'
const waypointClasses = require('./RingWaypoint.scss')

const TAU = Math.PI * 2

export interface IRingWaypointLineComponent {
  subjectCoordinates: {
    latitude: number
    longitude: number
  }
  normalizedOffset: PropTypes.number.isRequired
  projection: PropTypes.func.isRequired
  layout: ILayout
}

class RingWaypointLineComponent extends React.Component<IRingWaypointLineComponent> {
  renderLine(
    screenCoordinates: [
      { dotXScreenCoordinate: number; dotYScreenCoordinate: number; dotMiddlePoint: number }
    ]
  ) {
    if (screenCoordinates == null || screenCoordinates.length < 2) {
      return null
    }

    const coordinateArray = flatten(
      map(screenCoordinates, x => [x.dotXScreenCoordinate, x.dotYScreenCoordinate])
    )

    const polylinePoints = coordinateArray.join(',')

    return (
      <g id="FeatureLine" className={waypointClasses.accessPointConnector}>
        {<polyline className={waypointClasses.accessPointConnector} points={polylinePoints} />}
      </g>
    )
  }

  getXCoordinate(radialPosition, labelOffsetFromRadius, width) {
    const result = labelOffsetFromRadius * Math.cos(-Math.PI * 0.5 + radialPosition) + width * 0.5
    return result
  }

  getYCoordinate(radialPosition, labelOffsetFromRadius, height) {
    const result = labelOffsetFromRadius * Math.sin(-Math.PI * 0.5 + radialPosition) + height * 0.5
    return result
  }

  render() {
    const { width, height, radius, arcCompressionRatio } = this.props.layout
    const { subjectCoordinates, normalizedOffset, projection } = this.props
    // Let offsetLocationDegrees = 360 * arcCompressionRatio * normalizedOffset
    const radianOffset = TAU * arcCompressionRatio

    // This is the coordinate of the dot inside the Ring
    const subjectLatitude = subjectCoordinates.latitude
    const subjectLongitude = subjectCoordinates.longitude

    const subjectScreenCoordinates = projection([subjectLongitude, subjectLatitude])

    // This is the coordinate of the dot outside the Ring next to the label
    const labelOffsetFromRadius = radius + 30
    const radialPosition = radianOffset * normalizedOffset
    const labelCircleXCoordinate = this.getXCoordinate(radialPosition, labelOffsetFromRadius, width)
    const labelCircleYCoordinate = this.getYCoordinate(
      radialPosition,
      labelOffsetFromRadius,
      height
    )

    const lineStartPoint = {
      dotXScreenCoordinate: subjectScreenCoordinates[0],
      dotYScreenCoordinate: subjectScreenCoordinates[1],
    }

    const lineMiddlePoint = {
      dotXScreenCoordinate: this.getXCoordinate(radialPosition, radius - 6, width),
      dotYScreenCoordinate: this.getYCoordinate(radialPosition, radius - 6, height),
    }

    const lineEndPoint = {
      dotXScreenCoordinate: labelCircleXCoordinate,
      dotYScreenCoordinate: labelCircleYCoordinate,
    }

    const lineCoordinates: any = [lineStartPoint, lineMiddlePoint, lineEndPoint]

    return this.renderLine(lineCoordinates)
  }
}

export default RingWaypointLineComponent
