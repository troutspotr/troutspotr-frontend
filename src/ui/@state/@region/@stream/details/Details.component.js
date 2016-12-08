import React, { PropTypes } from 'react'
// import { Link } from 'react-router'
import classes from './Details.scss'
import { isEmpty } from 'lodash'
import RestrictionComponent from 'ui/core/regulations/Restriction.component'
import AccessPointComponent from './AccessPoint.component'
import SpeciesComponent from './Species.component'
import SummaryComponent from './Summary.component'
/* eslint-disable camelcase */
export const crossingTypes = {
  publicTrout: 'publicTrout',
  permissionRequired: 'permissionRequired',
  unsafe: 'unsafe',
  uninteresting: 'uninteresting'
}
// const DEFAULT_ZOOM = 16

const DetailsComponent = React.createClass({
  propTypes: {
    selectedStream: PropTypes.object,
    specialRegulationsCurrentSeason: PropTypes.array.isRequired,
    selectedAccessPoint: PropTypes.object,
    hoveredStream: PropTypes.object,
    hoveredRoad: PropTypes.object,
    location: PropTypes.object.isRequired,

    setHoveredRoad: PropTypes.func.isRequired,
    setSelectedRoad: PropTypes.func.isRequired,
    setHoveredStream: PropTypes.func.isRequired
  },

  // renderOpenInGoogleMapsLink (selectedAccessPoint) {
  //   let { centroid_latitude, centroid_longitude } = selectedAccessPoint.properties
  //   let url = `https://www.google.com/maps/@${centroid_latitude},${centroid_longitude},${DEFAULT_ZOOM}z`
  //   return (<a className={classes.googleLink} href={url} target='_blank'>(Google)</a>)
  // },

  renderRestrictions () {
    let { specialRegulationsCurrentSeason } = this.props
    let hasNoRestrictions = specialRegulationsCurrentSeason.length === 0
    if (hasNoRestrictions) {
      return null
    }

    let restrictionElements = specialRegulationsCurrentSeason.map((reg, index) => {
      return (<RestrictionComponent
        key={index}
        color={reg.isFishSanctuary ? 'red' : reg.isOpenerOverride ? 'blue' : 'yellow'}
        pattern={'solid'}
        text={reg.legalText}
        length={reg.roundedLength + ' mi'} />)
    })
    return (<div>
      <div className={classes.title}>Special Regulations</div>
      <div>
        {restrictionElements}
      </div>
    </div>)
  },

  mapAccessPoints (bridge, defaultBridgeClass, selectedBridgeClass, key) {
    let selectedAccessPoint = this.props.selectedAccessPoint
    let hoveredRoad = this.props.hoveredRoad
    let isSelected = isEmpty(selectedAccessPoint) === false && bridge.properties.gid === selectedAccessPoint.properties.gid
    let isHovered = isEmpty(hoveredRoad) === false && bridge.properties.gid === hoveredRoad.properties.gid
    return (<AccessPointComponent
      key={key}
      accessPoint={bridge}
      streamObject={this.props.selectedStream}
      selectedClass={selectedBridgeClass}
      defaultClass={defaultBridgeClass}
      isSelected={isSelected}
      isHovered={isHovered}
      location={this.props.location}
      onHover={this.props.setHoveredRoad}
      onSelect={this.props.setSelectedRoad} />)
  },

  renderBridgesBody () {
    let { selectedStream } = this.props
    let { accessPoints } = selectedStream
    let hasNoBridges = accessPoints.length === 0

    if (hasNoBridges) {
      return <div className={classes.listItemBasis}>None.</div>
    }

    let dictionary = {
      publicLandAndTroutStream: [],
      troutStreamOnly: [],
      uninteresting: [],
      unsafe: []
    }

    let bridgeGroups = accessPoints.reduce((current, element) => {
      let props = element.properties
      // let { is_over_publicly_accessible_land, is_over_trout_stream, isParkable, bridgeType } = props
      let { bridgeType } = props
      if (bridgeType === crossingTypes.uninteresting) {
        current.uninteresting.push(element)
        return current
      }

      if (bridgeType === crossingTypes.unsafe) {
        current.unsafe.push(element)
        return current
      }

      if (bridgeType === crossingTypes.publicTrout) {
        current.publicLandAndTroutStream.push(element)
        return current
      }

      current.troutStreamOnly.push(element)
      return current
    }, dictionary)

    let publicTroutStreamBridgeElements = bridgeGroups.publicLandAndTroutStream.map((bridge, index) => {
      return this.mapAccessPoints(bridge, classes.publicBridgeTroutStream, classes.selectedPublicBridgeTroutStream, index)
    })

    let troutStreamBridgeElements = bridgeGroups.troutStreamOnly.map((bridge, index) => {
      return this.mapAccessPoints(bridge, classes.bridgeOverTroutStream, classes.selectedBridgeOverTroutStream, index)
    })

    let unsafeTroutStreamBridgeElements = bridgeGroups.unsafe.map((bridge, index) => {
      return this.mapAccessPoints(bridge, classes.unsafeBridgeOverTroutStream, classes.selectedUnsafeBridgeOverTroutStream, index)
    })

    return (<div>
      {this.createBridgeListSummaryElement('With access to publicly fishable land:', publicTroutStreamBridgeElements)}
      {this.createBridgeListSummaryElement('Access requires Landowner permission:', troutStreamBridgeElements)}
      {this.createBridgeListSummaryElement('Unsafe to park:', unsafeTroutStreamBridgeElements)}
    </div>)
  },

  renderBridges () {
    let bridgesBody = this.renderBridgesBody()

    return (<div>
      <div className={classes.title}>Bridges</div>
      {bridgesBody}
    </div>)
  },

  createBridgeListSummaryElement (title, bridgeElements) {
    if (bridgeElements.length === 0) {
      return null
    }

    return (
      <div>
        <div className={classes.listHeader}>{title}</div>
        <div className={classes.list}>
          {bridgeElements}
        </div>
      </div>)
  },

  renderTributaries () {
    let { selectedStream } = this.props
    let { tributaries } = selectedStream
    let hasNoTributaries = tributaries.length === 0
    if (hasNoTributaries) {
      return null
    }

    let tributaryElements = tributaries.map((tributary, index) => {
      let { name } = tributary.properties.streamData.stream.properties
      return <div key={index} className={classes.listItem}>{name}</div>
    })

    return (<div>
      <div className={classes.title}>Tributaries</div>
      <div>
        {tributaryElements}
      </div>
    </div>)
  },

  renderSpecies () {
    return <SpeciesComponent selectedStream={this.props.selectedStream} />
  },

  renderSummary () {
    return <SummaryComponent selectedStream={this.props.selectedStream} />
  },

  render () {
    return (
      <div className={classes.container}>
        {this.renderSummary()}
        {this.renderBridges()}
        {this.renderRestrictions()}
        {this.renderTributaries()}
        {this.renderSpecies() }
      </div>)
  }
})
export default DetailsComponent
