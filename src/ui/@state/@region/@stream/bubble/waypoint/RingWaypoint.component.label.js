import React, {Component} from 'react'
import PropTypes from 'prop-types'
// Import classes from '../SvgBubble.scss'
import waypointClasses from './RingWaypoint.scss'
// Import accessPointClasses from './RingWaypoint.accessPoint.scss'
// Change to 1.0 for perfect left-right labels.
// Change to 0.0 for perfect orthoganal labels.
// Const LABEL_ANGULAR_COMPRESSION = 0.0
// Rotates

class RingWaypointLabelComponent extends Component {
  renderLabelText (text, offset, labelOffsetFromRadius) {
    const labelTextTransform = this.getLabelTextTransform(offset, labelOffsetFromRadius)

    if (text == null || offset == null) {
      throw new Error('argumetns cannot be null')
    }

    const textAnchor = 'center'

    return (<g transform={labelTextTransform} className={waypointClasses.text}>
      <text
        dominantBaseline="central"
        textAnchor={textAnchor}
      >{text}</text>
    </g>)
  }

  getContainerTransform (rotationDegrees, radialOffset) {
    const {width, height} = this.props.layout
    const translate = `translate(${radialOffset}, ${0})`
    const postRotate = `rotate(${rotationDegrees - 90})`
    const secondTranslate = `translate(${width * 0.5}, ${height * 0.5})`
    const transform = `${secondTranslate} ${postRotate} ${translate}`
    return transform
  }

  getLabelTextTransform (rotationDegrees, radialOffset) {
    const rotate = rotationDegrees

    const textXPos = 0

    const translate = `translate(${textXPos}, 0)`
    const transform = `${rotate} ${translate}`
    return transform
  }

  getIconTransform (rotationDegrees, radialOffset) {
    const rotate = rotationDegrees
    const transform = `translate(5,0) rotate(${-rotate + 90})`
    return transform
  }

  renderInterstateIcon (offset) {
    const transform = this.getIconTransform(offset)
    return (<g transform={transform} className={waypointClasses.icon}>
      {this.props.icon}
    </g>)
  }

  render () {
    const {radius, arcCompressionRatio} = this.props.layout
    const {normalizedOffset} = this.props

    // Class this to be the label class that can
    // :hover and :active and fade and be slightly transparent
    const labelOffsetFromRadius = radius + 28
    const offsetLocationDegrees = 360 * arcCompressionRatio * normalizedOffset
    const containerTransform = this.getContainerTransform(offsetLocationDegrees, labelOffsetFromRadius)
    // Let debuggerText = this.renderLabelText(this.props.labelText, offsetLocationDegrees)
    const debuggerIcon = this.renderInterstateIcon(offsetLocationDegrees)
    return (<g className={waypointClasses.label} transform={containerTransform}>
      <g className={waypointClasses.locationMarker}>
        {this.props.marker}
      </g>
      <g transform="translate(5, 0)" >
        {debuggerIcon}
      </g>
    </g>)
  }
}
RingWaypointLabelComponent.propTypes = {
  'marker': PropTypes.element.isRequired,
  'icon': PropTypes.element,
  'normalizedOffset': PropTypes.number.isRequired,
  'layout': PropTypes.shape({
    'width': PropTypes.number.isRequired,
    'height': PropTypes.number.isRequired,
    'radius': PropTypes.number.isRequired,
    'arcCompressionRatio': PropTypes.number.isRequired,
    'rotatePhase': PropTypes.number.isRequired,
  }),
}

export default RingWaypointLabelComponent
