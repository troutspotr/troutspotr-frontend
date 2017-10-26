import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './Details.scss'
import AnonymousAnalyzerApi from 'api/AnonymousAnalyzerApi'
/* eslint-disable camelcase */
export const crossingTypes = {
  'publicTrout': 'publicTrout',
  'permissionRequired': 'permissionRequired',
  'unsafe': 'unsafe',
  'uninteresting': 'uninteresting',
}
const DEFAULT_ZOOM = 16

class AccessPointComponent extends Component {
  constructor () {
    super()
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  onMouseLeave (e) {
    e.stopPropagation()
    this.props.onHover(null)
  }

  onMouseEnter (e) {
    e.stopPropagation()
    this.props.onHover(this.props.accessPoint)
  }

  onClick (e) {
    e.preventDefault()
    // Other folks use this component and don't need
    // So much fancy stuff.
    if (location == null) {
      return
    }
    const hash = `#${this.props.accessPoint.properties.slug}`
    location.href = hash
    // Return false
  }

  openGoogleMaps (e) {
    // When it rains it pours. Because of the iOS add to start menu
    // Bug, we have to manually do this. yuck. whatever.
    e.preventDefault()
    const address = e.target.getAttribute('href')
    window.open(address, '_blank')
    AnonymousAnalyzerApi.recordEvent('open_in_google_maps', {address})
    return false
  }

  renderOpenInGoogleMapsLink (selectedAccessPoint) {
    const {centroid_latitude, centroid_longitude} = selectedAccessPoint.properties
    const url = `https://www.google.com/maps/@${centroid_latitude},${centroid_longitude},${DEFAULT_ZOOM}z`
    return (<span onClick={this.openGoogleMaps} className={classes.googleLink} href={url} target="_blank">Google Maps</span>)
  }

  mapAccessPoints (bridge, defaultBridgeClass, selectedBridgeClass, isSelected, isHovered) {
    const {street_name} = bridge.properties
    const letter = bridge.properties.alphabetLetter
    const bridgeClass = isSelected ? selectedBridgeClass : defaultBridgeClass
    const badgeElement = (<span className={bridgeClass}>{letter}</span>)
    const textClass = isSelected ? classes.selectedItem : classes.listText
    const listItemClass = isHovered ? classes.hoveredItem : classes.listItem
    const hash = `#${this.props.accessPoint.properties.slug}`
    return (<a
      href={hash}
      className={listItemClass}
      onClick={this.onClick}
      onMouseEnter={this.onMouseEnter}
      onMouseLeave={this.onMouseLeave}
    >
      <span>{badgeElement}</span>
      <span className={textClass}>{street_name} {isSelected && this.renderOpenInGoogleMapsLink(bridge)}</span>
    </a>)
  }

  render () {
    const {accessPoint, selectedClass, defaultClass, isSelected, isHovered} = this.props
    return this.mapAccessPoints(accessPoint, defaultClass, selectedClass, isSelected, isHovered)
  }
}

AccessPointComponent.propTypes = {
  'accessPoint': PropTypes.object.isRequired,
  'selectedClass': PropTypes.string.isRequired,
  'defaultClass': PropTypes.string.isRequired,
  'isSelected': PropTypes.bool.isRequired,
  'isHovered': PropTypes.bool.isRequired,

  'onHover': PropTypes.func.isRequired,
}

export default AccessPointComponent
