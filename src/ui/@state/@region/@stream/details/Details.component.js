import React, { PropTypes } from 'react'
import classes from './Details.scss'
import RestrictionComponent from 'ui/core/regulations/Restriction.component'
import { has } from 'lodash'

export const crossingTypes = {
  publicTrout: 'publicTrout',
  permissionRequired: 'permissionRequired',
  unsafe: 'unsafe',
  uninteresting: 'uninteresting'
}

const DetailsComponent = React.createClass({
  propTypes: {
    selectedStream: PropTypes.object
  },

  renderRestrictions () {
    let { selectedStream } = this.props
    let { restrictions } = selectedStream
    let hasNoRestrictions = restrictions.length === 0
    if (hasNoRestrictions) {
      return null
    }

    let restrictionElements = restrictions.map((restriction, index) => {
      let text = 'fake thing'
      let color = 'yellow'
      let length = '18.2'
      let pattern = 'solid'
      return <RestrictionComponent
        text={text}
        color={color}
        length={length}
        pattern={pattern}
        key={index} />
    })
    return (<div>
      <div className={classes.title}>Special Regulations</div>
      <div>
        {restrictionElements}
      </div>
    </div>)
  },

  renderBridges () {
    let { selectedStream } = this.props
    let { accessPoints } = selectedStream
    let hasNoRestrictions = accessPoints.length === 0
    if (hasNoRestrictions) {
      return null
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
      console.log(bridgeType)
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
      let { street_name } = bridge.properties
      let letter = bridge.properties.alphabetLetter
      let bridgeClass = classes.publicBridgeTroutStream
      let badgeElement = (<span className={bridgeClass}>{letter}</span>)
      return (<div className={classes.listItem}>
        <span>{badgeElement}</span>
        <span className={classes.listText}>{street_name}</span>
      </div>)
    })

    let troutStreamBridgeElements = bridgeGroups.troutStreamOnly.map((bridge, index) => {
      let { street_name } = bridge.properties
      let letter = bridge.properties.alphabetLetter
      let bridgeClass = classes.bridgeOverTroutStream
      let badgeElement = (<span className={bridgeClass}>{letter}</span>)
      // return (<div className={classes.listItem}>{badgeElement} {street_name}</div>)
      return (<div className={classes.listItem}>
        <span>{badgeElement}</span>
        <span className={classes.listText}>{street_name}</span>
      </div>)
    })

    let unsafeTroutStreamBridgeElements = bridgeGroups.unsafe.map((bridge, index) => {
      let { street_name } = bridge.properties
      let letter = bridge.properties.alphabetLetter
      let bridgeClass = classes.unsafeBridgeOverTroutStream
      let badgeElement = (<span className={bridgeClass}>{letter}</span>)
      // return (<div className={classes.listItem}>{badgeElement} {street_name}</div>)
      return (<div className={classes.listItem}>
        <span>{badgeElement}</span>
        <span className={classes.listText}>{street_name}</span>
      </div>)
    })

    return (<div>
      <div className={classes.title}>Bridges</div>
      <div className={classes.listHeader}>With access to publicly fishable land</div>
      <div className={classes.list}>
        {publicTroutStreamBridgeElements}
      </div>
      <div className={classes.listHeader}>Access requires Landowner permission</div>
      <div className={classes.list}>
        {troutStreamBridgeElements}
      </div>
      <div className={classes.listHeader}>Unsafe to park</div>
      <div className={classes.list}>
        {unsafeTroutStreamBridgeElements}
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

      let color = 'yellow'
      let length = 18.2
      let pattern = 'solid'

      return <div key={index} className={classes.listItem}>{name}</div>
    })

    return (<div>
      <div className={classes.title}>Tributaries</div>
      <div>
        {tributaryElements}
      </div>
    </div>)
  },

  render () {
    return (
      <div className={classes.container}>
        {this.renderBridges()}
        {this.renderRestrictions()}
        {this.renderTributaries()}
      </div>)
  }
})
export default DetailsComponent
