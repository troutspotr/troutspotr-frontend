import React, { PropTypes } from 'react'
// import _ from 'lodash'
// import classes from '../SvgBubble.scss'
import waypointClasses from './RingWaypoint.scss'
// import accessPointClasses from './RingWaypoint.accessPoint.scss'
// change to 1.0 for perfect left-right labels.
// change to 0.0 for perfect orthoganal labels.
// const LABEL_ANGULAR_COMPRESSION = 0.0
// rotates
const RingWaypointLabelComponent = React.createClass({
  propTypes: {
    marker: PropTypes.element.isRequired,
    icon: PropTypes.element,
    labelText: PropTypes.string.isRequired,
    normalizedOffset: PropTypes.number.isRequired,
    layout: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      radius: PropTypes.number.isRequired,
      arcCompressionRatio: PropTypes.number.isRequired,
      rotatePhase: PropTypes.number.isRequired
    })
  },

  renderLabelText (text, offset, labelOffsetFromRadius) {
    let labelTextTransform = this.getLabelTextTransform(offset, labelOffsetFromRadius)

    if (text == null || offset == null) {
      throw new Error('argumetns cannot be null')
    }

    let textAnchor = offset > 180
      ? 'end'
      : 'start'

    return (<g transform={labelTextTransform} className={waypointClasses.text}>
      <text
        dominantBaseline='central'
        textAnchor={textAnchor}>{text}</text>
    </g>)
  },

  getContainerTransform (rotationDegrees, radialOffset) {
    let { width, height } = this.props.layout
    let translate = `translate(${radialOffset}, ${0})`
    let postRotate = `rotate(${rotationDegrees - 90})`
    let secondTranslate = `translate(${width * 0.5}, ${height * 0.5})`
    let transform = `${secondTranslate} ${postRotate} ${translate}`
    return transform
  },

  getLabelTextTransform (rotationDegrees, radialOffset) {
    let rotate = rotationDegrees > 180
      ? 'rotate(180)'
      : 'rotate(0)'

    let textXPos = rotationDegrees > 180
      ? -12
      : 12

    let translate = `translate(${textXPos}, 0)`
    let transform = `${rotate} ${translate}`
    return transform
  },

  getIconTransform (rotationDegrees, radialOffset) {
    let rotate = rotationDegrees > 180 ? 180 : 0
    let transform = `translate(5,0)rotate(${rotate})`
    return transform
  },

  renderInterstateIcon (offset) {
    let transform = this.getIconTransform(offset)
    return <g transform={transform} className={waypointClasses.icon}>
      {this.props.icon}
    </g>
  },

  // let asdf = -6
  // <use className={accessPointClasses.roadSign} xlinkHref='#us-interstate' x={asdf} y={asdf} />
  // <text textAnchor='middle' fontSize='7px' x={asdf + 6} y={asdf + 5} dominantBaseline='central'>{number}</text>

  render () {
    let { radius, arcCompressionRatio } = this.props.layout
    let { normalizedOffset } = this.props

    // class this to be the label class that can
    // :hover and :active and fade and be slightly transparent
    let labelOffsetFromRadius = radius + 28
    let offsetLocationDegrees = 360 * arcCompressionRatio * normalizedOffset
    let containerTransform = this.getContainerTransform(offsetLocationDegrees, labelOffsetFromRadius)
    let debuggerText = this.renderLabelText(this.props.labelText, offsetLocationDegrees)
    let debuggerIcon = this.renderInterstateIcon(offsetLocationDegrees)
    return <g className={waypointClasses.label} transform={containerTransform}>
      <g className={waypointClasses.locationMarker}>
        {this.props.marker}
      </g>
      <g transform='translate(5, 0)' >
        {debuggerIcon}
        {debuggerText}
      </g>
    </g>
  }
})

export default RingWaypointLabelComponent
