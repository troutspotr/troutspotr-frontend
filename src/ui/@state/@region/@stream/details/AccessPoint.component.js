import React, { PropTypes } from 'react'
import classes from './Details.scss'
// import { isEmpty } from 'lodash'
/* eslint-disable camelcase */
export const crossingTypes = {
  publicTrout: 'publicTrout',
  permissionRequired: 'permissionRequired',
  unsafe: 'unsafe',
  uninteresting: 'uninteresting'
}
const DEFAULT_ZOOM = 16

const AccessPointComponent = React.createClass({
  propTypes: {
    accessPoint: PropTypes.object.isRequired,
    streamObject: PropTypes.object.isRequired,
    selectedClass: PropTypes.string.isRequired,
    defaultClass: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isHovered: PropTypes.bool.isRequired,

    onHover: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  },

  onMouseLeave (e) {
    e.stopPropagation()
    this.props.onHover(null)
  },

  onMouseEnter (e) {
    e.stopPropagation()
    this.props.onHover(this.props.accessPoint)
  },

  onClick (e) {
    this.props.onSelect(this.props.accessPoint)
  },

  renderOpenInGoogleMapsLink (selectedAccessPoint) {
    let { centroid_latitude, centroid_longitude } = selectedAccessPoint.properties
    let url = `https://www.google.com/maps/@${centroid_latitude},${centroid_longitude},${DEFAULT_ZOOM}z`
    return (<a className={classes.googleLink} href={url} target='_blank'>Google</a>)
  },

  mapAccessPoints (bridge, defaultBridgeClass, selectedBridgeClass, isSelected, isHovered) {
    // let selectedAccessPoint = this.props.selectedAccessPoint
    // let isSelected = isEmpty(selectedAccessPoint) === false && bridge.properties.gid === selectedAccessPoint.properties.gid
    let { street_name } = bridge.properties
    let letter = bridge.properties.alphabetLetter
    let bridgeClass = isSelected ? selectedBridgeClass : defaultBridgeClass
    let badgeElement = (<span className={bridgeClass}>{letter}</span>)
    let textClass = isSelected ? classes.selectedItem : classes.listText
    let listItemClass = isHovered ? classes.hoveredItem : classes.listItem
    return (<div
      className={listItemClass}
      onMouseEnter={this.onMouseEnter}
      onMouseLeave={this.onMouseLeave}
      onClick={this.onClick}>
      <span>{badgeElement}</span>
      <span className={textClass}>{street_name} {isSelected && this.renderOpenInGoogleMapsLink(bridge)}</span>
    </div>)
  },

  render () {
    let { accessPoint, selectedClass, defaultClass, isSelected, isHovered } = this.props
    return this.mapAccessPoints(accessPoint, defaultClass, selectedClass, isSelected, isHovered)
  }
})
export default AccessPointComponent
