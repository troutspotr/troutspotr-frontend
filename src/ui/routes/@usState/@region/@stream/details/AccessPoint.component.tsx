import * as React from 'react'
const classes = require('./Details.scss')
import { AccessPointFeature } from 'api/region/IRegionGeoJSON'
import { BadgeComponent, Color, Fill } from 'ui/core/badge/Badge.component';

export const bridgeTypeToFillColorDictionary = {
  permissionRequired: Color.privatelyFishable,
  publicTrout: Color.publiclyFishable,
  unsafe: Color.unsafeToFish,
  uninteresting: Color.warning,
}

export interface IAccessPointsDispatchProps {
  onHover(feature: AccessPointFeature | null): void
  onClickAccessPoint(feature: AccessPointFeature | null): void
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
    if (this.props.onClickAccessPoint != null) {
      this.props.onClickAccessPoint(this.props.accessPoint)
    }
  }

  public openGoogleMaps(e, selectedAccessPoint: AccessPointFeature) {
    // When it rains it pours. Because of the iOS add to start menu
    // Bug, we have to manually do this. yuck. whatever.
    e.preventDefault()
    const address = `https://www.google.com/maps/search/?api=1&query=${selectedAccessPoint.properties.centroid_latitude},${selectedAccessPoint.properties.centroid_longitude}&basemap=satellite&zoom=15`
    window.open(address, '_blank')
    // AnonymousAnalyzerApi.recordEvent('open_in_google_maps', { address })
    return false
  }

  public renderOpenInGoogleMapsLink(selectedAccessPoint: AccessPointFeature) {
    return (
      // tslint:disable-next-line:jsx-no-lambda
      <span onClick={(e) => this.openGoogleMaps(e, selectedAccessPoint)} className={classes.googleLink}>
        Google Maps
      </span>
    )
  }

  public mapAccessPoints(bridge: AccessPointFeature, isSelected, isHovered) {
    const { street_name, alphabetLetter, bridgeType } = bridge.properties
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
        <BadgeComponent fillType={isSelected ? Fill.solid : Fill.hollow} content={alphabetLetter} badgeColor={bridgeTypeToFillColorDictionary[bridgeType]} />
        <span className={textClass}>
          {street_name} {isSelected && this.renderOpenInGoogleMapsLink(bridge)}
        </span>
      </a>
    )
  }

  public render() {
    const { accessPoint, isSelected, isHovered } = this.props
    return this.mapAccessPoints(accessPoint, isSelected, isHovered)
  }
}

export default AccessPointComponent
