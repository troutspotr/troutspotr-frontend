import React, { PropTypes } from 'react'
import classes from './Details.scss'
// import { Link } from 'react-router'
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
    location: PropTypes.object.isRequired,

    onHover: PropTypes.func.isRequired
    // onSelect: PropTypes.func.isRequired
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
    e.preventDefault()
    let hash = `#${this.props.accessPoint.properties.slug}`
    location.href = hash
    // return false
  },

  openGoogleMaps (e) {
    // when it rains it pours. Because of the iOS add to start menu
    // bug, we have to manually do this. yuck. whatever.
    e.preventDefault()
    window.open(e.target.href, '_blank')
    return false
  },

  renderOpenInGoogleMapsLink (selectedAccessPoint) {
    let { centroid_latitude, centroid_longitude } = selectedAccessPoint.properties
    let url = `https://www.google.com/maps/@${centroid_latitude},${centroid_longitude},${DEFAULT_ZOOM}z`
    return (<a onClick={this.openGoogleMaps} className={classes.googleLink} href={url} target='_blank'>GMap</a>)
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
    let hash = `#${this.props.accessPoint.properties.slug}`
    return (<a
      href={hash}
      className={listItemClass}
      onClick={this.onClick}
      onMouseEnter={this.onMouseEnter}
      onMouseLeave={this.onMouseLeave} >
      <span>{badgeElement}</span>
      <span className={textClass}>{street_name} {isSelected && this.renderOpenInGoogleMapsLink(bridge)}</span>
    </a>)
  },

  render () {
    let { accessPoint, selectedClass, defaultClass, isSelected, isHovered } = this.props
    return this.mapAccessPoints(accessPoint, defaultClass, selectedClass, isSelected, isHovered)
  }
})
export default AccessPointComponent
