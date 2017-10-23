import React, {Component} from 'react'
import PropTypes from 'prop-types'
// Import { Link } from 'react-router'
import classes from './Details.scss'
import {isEmpty} from 'lodash'
import RestrictionComponent from 'ui/core/regulations/Restriction.component'
import AccessPointComponent from './AccessPoint.component'
import SpeciesComponent from './Species.component'
import SummaryComponent from './Summary.component'
/* eslint-disable camelcase */
export const crossingTypes = {
  'publicTrout': 'publicTrout',
  'permissionRequired': 'permissionRequired',
  'unsafe': 'unsafe',
  'uninteresting': 'uninteresting',
}
// Const DEFAULT_ZOOM = 16

class DetailsComponent extends Component {
  renderRestrictions () {
    const {specialRegulationsCurrentSeason} = this.props
    const hasNoRestrictions = specialRegulationsCurrentSeason.length === 0
    if (hasNoRestrictions) {
      return null
    }

    const restrictionElements = specialRegulationsCurrentSeason.map((reg, index) => {
      const id = `${reg.streamId}_${reg.restrictionId}`
      return (<RestrictionComponent
        key={id}
        color={reg.color}
        pattern={'solid'}
        text={reg.legalText}
        length={`${reg.roundedLength} mi`}
      />)
    })
    return (<div>
      <div className={classes.title}>Special Regulations</div>
      <div>
        {restrictionElements}
      </div>
    </div>)
  }

  mapAccessPoints (bridge, defaultBridgeClass, selectedBridgeClass, key) {
    const selectedAccessPoint = this.props.selectedAccessPoint
    const hoveredRoad = this.props.hoveredRoad
    const isSelected = isEmpty(selectedAccessPoint) === false && bridge.properties.gid === selectedAccessPoint.properties.gid
    const isHovered = isEmpty(hoveredRoad) === false && bridge.properties.gid === hoveredRoad.properties.gid
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
      onSelect={this.props.setSelectedRoad}
    />)
  }

  renderBridgesBody () {
    const {selectedStream} = this.props
    const {accessPoints} = selectedStream
    const hasNoBridges = accessPoints.length === 0

    if (hasNoBridges) {
      return <div className={classes.listItemBasis}>None.</div>
    }

    const dictionary = {
      'publicLandAndTroutStream': [],
      'troutStreamOnly': [],
      'uninteresting': [],
      'unsafe': [],
    }

    const bridgeGroups = accessPoints.reduce((current, element) => {
      const props = element.properties
      // Let { is_over_publicly_accessible_land, is_over_trout_stream, isParkable, bridgeType } = props
      const {bridgeType} = props
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

    const publicTroutStreamBridgeElements = bridgeGroups.publicLandAndTroutStream.map((bridge, index) => this.mapAccessPoints(bridge, classes.publicBridgeTroutStream, classes.selectedPublicBridgeTroutStream, index))

    const troutStreamBridgeElements = bridgeGroups.troutStreamOnly.map((bridge, index) => this.mapAccessPoints(bridge, classes.bridgeOverTroutStream, classes.selectedBridgeOverTroutStream, index))

    const unsafeTroutStreamBridgeElements = bridgeGroups.unsafe.map((bridge, index) => this.mapAccessPoints(bridge, classes.unsafeBridgeOverTroutStream, classes.selectedUnsafeBridgeOverTroutStream, index))

    return (<div>
      {this.createBridgeListSummaryElement('With access to publicly fishable land:', publicTroutStreamBridgeElements)}
      {this.createBridgeListSummaryElement('Access requires Landowner permission:', troutStreamBridgeElements)}
      {this.createBridgeListSummaryElement('Unsafe to park:', unsafeTroutStreamBridgeElements)}
    </div>)
  }

  renderBridges () {
    const bridgesBody = this.renderBridgesBody()

    return (<div>
      <div className={classes.title}>Bridges</div>
      {bridgesBody}
    </div>)
  }

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
  }

  renderTributaries () {
    const {selectedStream} = this.props
    const {tributaries} = selectedStream
    const hasNoTributaries = tributaries.length === 0
    if (hasNoTributaries) {
      return null
    }

    const tributaryElements = tributaries.map((tributary, index) => {
      const {name, gid} = tributary.properties.streamData.stream.properties
      return <div key={gid} className={classes.listItem}>{name}</div>
    })

    return (<div>
      <div className={classes.title}>Tributaries</div>
      <div>
        {tributaryElements}
      </div>
    </div>)
  }

  renderSpecies () {
    return <SpeciesComponent selectedStream={this.props.selectedStream} />
  }

  renderSummary () {
    return (
      <div>
        <SummaryComponent selectedStream={this.props.selectedStream} />
      </div>)
  }

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
}

DetailsComponent.propTypes = {
  'selectedStream': PropTypes.object,
  'specialRegulationsCurrentSeason': PropTypes.array.isRequired,
  'selectedAccessPoint': PropTypes.object,
  'hoveredRoad': PropTypes.object,
  'location': PropTypes.object.isRequired,

  'setHoveredRoad': PropTypes.func.isRequired,
  'setSelectedRoad': PropTypes.func.isRequired,
}

export default DetailsComponent
