import * as React from 'react'
const classes = require('./Details.scss')
import { AccessPointFeature } from 'api/region/IRegionGeoJSON'
/* eslint-disable camelcase */
// const DEFAULT_ZOOM = 16

export interface IAccessPointsDispatchProps {
  onHover(feature: AccessPointFeature | null): void
}

export interface IAccessPointProps extends IAccessPointsDispatchProps {
  accessPoint: AccessPointFeature
  selectedClass: string
  defaultClass: string
  isSelected: boolean
  isHovered: boolean
}
class AccessPointComponent extends React.Component<IAccessPointProps> {
  constructor(props) {
    super(props)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  public onMouseLeave(e) {
    e.stopPropagation()
    this.props.onHover(null)
  }

  public onMouseEnter(e) {
    e.stopPropagation()
    this.props.onHover(this.props.accessPoint)
  }

  public onClick(e) {
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

  public openGoogleMaps(e) {
    // When it rains it pours. Because of the iOS add to start menu
    // Bug, we have to manually do this. yuck. whatever.
    e.preventDefault()
    const address = e.target.getAttribute('href')
    window.open(address, '_blank')
    // AnonymousAnalyzerApi.recordEvent('open_in_google_maps', { address })
    return false
  }

  public renderOpenInGoogleMapsLink(selectedAccessPoint) {
    return (
      <span onClick={this.openGoogleMaps} className={classes.googleLink}>
        Google Maps
      </span>
    )
  }

  public mapAccessPoints(bridge, defaultBridgeClass, selectedBridgeClass, isSelected, isHovered) {
    const { street_name } = bridge.properties
    const letter = bridge.properties.alphabetLetter
    const bridgeClass = isSelected ? selectedBridgeClass : defaultBridgeClass
    const badgeElement = <span className={bridgeClass}>{letter}</span>
    const textClass = isSelected ? classes.selectedItem : classes.listText
    const listItemClass = isHovered ? classes.hoveredItem : classes.listItem
    const hash = `#${this.props.accessPoint.properties.slug}`
    return (
      <a
        href={hash}
        className={listItemClass}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <span>{badgeElement}</span>
        <span className={textClass}>
          {street_name} {isSelected && this.renderOpenInGoogleMapsLink(bridge)}
        </span>
      </a>
    )
  }

  public render() {
    const { accessPoint, selectedClass, defaultClass, isSelected, isHovered } = this.props
    return this.mapAccessPoints(accessPoint, defaultClass, selectedClass, isSelected, isHovered)
  }
}

export default AccessPointComponent
