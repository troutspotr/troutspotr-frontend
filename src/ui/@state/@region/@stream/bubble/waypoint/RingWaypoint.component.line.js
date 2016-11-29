import React, { PropTypes } from 'react'
import _ from 'lodash'
// import classes from '../SvgBubble.scss'
import waypointClasses from './RingWaypoint.scss'

const TAU = Math.PI * 2

const RingWaypointLineComponent = React.createClass({
  propTypes: {
    subjectCoordinates: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    }),
    normalizedOffset: PropTypes.number.isRequired,
    projection: PropTypes.func.isRequired,
    layout: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      radius: PropTypes.number.isRequired,
      arcCompressionRatio: PropTypes.number.isRequired,
      rotatePhase: PropTypes.number.isRequired
    })
  },

  renderLine (screenCoordinates) {
    if (screenCoordinates == null || screenCoordinates.length < 2) {
      return null
    }

    let coordinateArray = _.flatten(
      _.map(screenCoordinates, x => [x.dotXScreenCoordinate, x.dotYScreenCoordinate]))

    let polylinePoints = coordinateArray.join(',')

    return <g id='FeatureLine' className={waypointClasses.accessPointConnector}>
      {
        <polyline className={waypointClasses.accessPointConnector} points={polylinePoints} />
      }
    </g>
  },

  getXCoordinate (radialPosition, labelOffsetFromRadius, width) {
    let result = labelOffsetFromRadius * Math.cos((-Math.PI * 0.5) + radialPosition) + (width * 0.5)
    return result
  },

  getYCoordinate (radialPosition, labelOffsetFromRadius, height) {
    let result = labelOffsetFromRadius * Math.sin((-Math.PI * 0.5) + radialPosition) + (height * 0.5)
    return result
  },

  render () {
    let { width, height, radius, arcCompressionRatio } = this.props.layout
    let { subjectCoordinates, normalizedOffset, projection } = this.props
    // let offsetLocationDegrees = 360 * arcCompressionRatio * normalizedOffset
    let radianOffset = TAU * arcCompressionRatio

    // this is the coordinate of the dot inside the Ring
    let subjectLatitude = subjectCoordinates.latitude
    let subjectLongitude = subjectCoordinates.longitude

    let subjectScreenCoordinates = projection([subjectLongitude, subjectLatitude])

    // this is the coordinate of the dot outside the Ring next to the label
    let labelOffsetFromRadius = radius + 30
    let radialPosition = radianOffset * normalizedOffset
    let labelCircleXCoordinate = this.getXCoordinate(radialPosition, labelOffsetFromRadius, width)
    let labelCircleYCoordinate = this.getYCoordinate(radialPosition, labelOffsetFromRadius, height)

    let lineStartPoint = {
      dotXScreenCoordinate: subjectScreenCoordinates[0],
      dotYScreenCoordinate: subjectScreenCoordinates[1]
    }

    let lineMiddlePoint = {
      dotXScreenCoordinate: this.getXCoordinate(radialPosition, radius - 6, width),
      dotYScreenCoordinate: this.getYCoordinate(radialPosition, radius - 6, height)
    }

    let lineEndPoint = {
      dotXScreenCoordinate: labelCircleXCoordinate,
      dotYScreenCoordinate: labelCircleYCoordinate
    }

    let lineCoordinates = [lineStartPoint, lineMiddlePoint, lineEndPoint]
      // {this.props.subjectElement}

    return this.renderLine(lineCoordinates)
  }
})

export default RingWaypointLineComponent
