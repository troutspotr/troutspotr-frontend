import { Feature, Point } from 'geojson'
import { IAccessPointGeoJsonProps } from 'coreTypes/accessPoint/IAccessPoint'
import * as React from 'react'
// Import { Link } from 'react-router'
// const classes = require('./Details.scss')
/* eslint-disable camelcase */
// import { crossingTypes } from 'api/GeoApi.accessPoints'
import { IStreamObject } from 'coreTypes/IStreamObject'

import isEmpty from 'lodash-es/isEmpty'
// import RestrictionComponent from 'ui/core/regulations/Restriction.component'
import AccessPointComponent from './AccessPoint.component'
// import SpeciesComponent from './Species.component'
// import SummaryComponent from './Summary.component'
// Const DEFAULT_ZOOM = 16

export interface IDetailsComponentStateProps {
  specialRegulationsCurrentSeason: any
  selectedAccessPoint: Feature<Point, IAccessPointGeoJsonProps>
  hoveredRoad: Feature<Point, IAccessPointGeoJsonProps>
  location: any
}

export interface IDetailsComponentDispatchProps {
  setHoveredRoad: any
  setSelectedRoad: any
  setHoveredStream: any
}

export interface IDetailsComponent
  extends IDetailsComponentStateProps,
    IDetailsComponentDispatchProps {
  selectedStream: IStreamObject
}

class DetailsComponent extends React.Component<IDetailsComponent> {
  renderRestrictions() {
    // const { specialRegulationsCurrentSeason } = this.props
    // const hasNoRestrictions = specialRegulationsCurrentSeason.length === 0
    // if (hasNoRestrictions) {
    //   return null
    // }

    // const restrictionElements = specialRegulationsCurrentSeason.map((reg, index) => {
    //   const id = `${reg.streamId}_${reg.restrictionId}`
    //   return (
    //     <RestrictionComponent
    //       key={id}
    //       color={reg.color}
    //       pattern={'solid'}
    //       text={reg.legalText}
    //       length={`${reg.roundedLength} mi`}
    //     />
    //   )
    // })
    // return (
    //   <div>
    //     <div className={classes.title}>Special Regulations</div>
    //     <div>{restrictionElements}</div>
    //   </div>
    // )
    return null
  }

  mapAccessPoints(bridge, defaultBridgeClass, selectedBridgeClass, key) {
    const selectedAccessPoint = this.props.selectedAccessPoint
    const hoveredRoad = this.props.hoveredRoad
    const isSelected =
      isEmpty(selectedAccessPoint) === false &&
      bridge.properties.gid === selectedAccessPoint.properties.gid
    const isHovered =
      isEmpty(hoveredRoad) === false && bridge.properties.gid === hoveredRoad.properties.gid
    return (
      <AccessPointComponent
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
      />
    )
  }

  // renderBridgesBody() {
  //   const { selectedStream } = this.props
  //   const { accessPoints } = selectedStream
  //   const hasNoBridges = accessPoints.length === 0

  //   if (hasNoBridges) {
  //     return <div className={classes.listItemBasis}>None.</div>
  //   }

  //   const dictionary = {
  //     publicLandAndTroutStream: [],
  //     troutStreamOnly: [],
  //     uninteresting: [],
  //     unsafe: [],
  //   }

  //   const bridgeGroups = accessPoints.reduce((current, element) => {
  //     const props = element.properties
  //     // Let { is_over_publicly_accessible_land, is_over_trout_stream, isParkable, bridgeType } = props
  //     const { bridgeType } = props
  //     if (bridgeType === crossingTypes.uninteresting) {
  //       current.uninteresting.push(element)
  //       return current
  //     }

  //     if (bridgeType === crossingTypes.unsafe) {
  //       current.unsafe.push(element)
  //       return current
  //     }

  //     if (bridgeType === crossingTypes.publicTrout) {
  //       current.publicLandAndTroutStream.push(element)
  //       return current
  //     }

  //     current.troutStreamOnly.push(element)
  //     return current
  //   }, dictionary)

  //   const publicTroutStreamBridgeElements = bridgeGroups.publicLandAndTroutStream.map(
  //     (bridge, index) =>
  //       this.mapAccessPoints(
  //         bridge,
  //         classes.publicBridgeTroutStream,
  //         classes.selectedPublicBridgeTroutStream,
  //         index
  //       )
  //   )

  //   const troutStreamBridgeElements = bridgeGroups.troutStreamOnly.map((bridge, index) =>
  //     this.mapAccessPoints(
  //       bridge,
  //       classes.bridgeOverTroutStream,
  //       classes.selectedBridgeOverTroutStream,
  //       index
  //     )
  //   )

  //   const unsafeTroutStreamBridgeElements = bridgeGroups.unsafe.map((bridge, index) =>
  //     this.mapAccessPoints(
  //       bridge,
  //       classes.unsafeBridgeOverTroutStream,
  //       classes.selectedUnsafeBridgeOverTroutStream,
  //       index
  //     )
  //   )

  //   return (
  //     <div>
  //       {this.createBridgeListSummaryElement(
  //         'With access to publicly fishable land:',
  //         publicTroutStreamBridgeElements
  //       )}
  //       {this.createBridgeListSummaryElement(
  //         'Access requires Landowner permission:',
  //         troutStreamBridgeElements
  //       )}
  //       {this.createBridgeListSummaryElement('Unsafe to park:', unsafeTroutStreamBridgeElements)}
  //     </div>
  //   )
  // }

  // renderBridges() {
  //   const bridgesBody = this.renderBridgesBody()

  //   return (
  //     <div>
  //       <div className={classes.title}>Bridges</div>
  //       {bridgesBody}
  //     </div>
  //   )
  // }

  // createBridgeListSummaryElement(title, bridgeElements) {
  //   if (bridgeElements.length === 0) {
  //     return null
  //   }

  //   return (
  //     <div>
  //       <div className={classes.listHeader}>{title}</div>
  //       <div className={classes.list}>{bridgeElements}</div>
  //     </div>
  //   )
  // }

  // renderTributaries() {
  //   const { selectedStream } = this.props
  //   const { tributaries } = selectedStream
  //   const hasNoTributaries = tributaries.length === 0
  //   if (hasNoTributaries) {
  //     return null
  //   }

  //   const tributaryElements = tributaries.map((tributary, index) => {
  //     const { name, gid } = tributary.properties.streamData.stream.properties
  //     return (
  //       <div key={gid} className={classes.listItem}>
  //         {name}
  //       </div>
  //     )
  //   })

  //   return (
  //     <div>
  //       <div className={classes.title}>Tributaries</div>
  //       <div>{tributaryElements}</div>
  //     </div>
  //   )
  // }

  // renderSpecies() {
  //   return <SpeciesComponent selectedStream={this.props.selectedStream} />
  // }

  // renderSummary() {
  //   return (
  //     <div>
  //       <SummaryComponent selectedStream={this.props.selectedStream} />
  //     </div>
  //   )
  // }

  render() {
    return null
    // return (
    //   <div className={classes.container}>
    //     {this.renderSummary()}
    //     {this.renderBridges()}
    //     {this.renderRestrictions()}
    //     {this.renderTributaries()}
    //     {this.renderSpecies()}
    //   </div>
    // )
  }
}

export default DetailsComponent
