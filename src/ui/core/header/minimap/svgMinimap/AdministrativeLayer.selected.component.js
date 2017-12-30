import React, {Component} from 'react'
import PropTypes from 'prop-types'
import RegionComponent from './Region.component'
import {has, isEmpty} from 'lodash'
import shallowCompare from 'shallow-compare'
import classes from './SvgMap.scss'

class AdministrativeLayerSelectedComponent extends Component {
  renderSelectedRegions () {
    const {selectedRegion, regionsGeoJson, selectedStreamCentroid} = this.props
    const isStreamSelected = isEmpty(selectedStreamCentroid) === false
    if (isStreamSelected) {
      // If thre's a selected stream, we don't have to display the selected region.
      // It's pretty obvious.
      return null
    }
    const selectedRegionId = isEmpty(selectedRegion) === false
      ? selectedRegion.properties.path.toLowerCase()
      : null
    if (selectedRegionId == null) {
      return null
    }

    const selectedRegions = regionsGeoJson.features.filter((f) => f.properties.path.toLowerCase() === selectedRegionId)

    return selectedRegions.map((region, index) => {
      const {isOffline, cachedRegions} = this.props
      const isCached = isOffline && has(cachedRegions, region.properties.gid)
      const isActive = isOffline === false || isCached
      return (<RegionComponent
        geoJson={region}
        isSelected
        isCached={isCached}
        isActive={isActive}
        key={region.properties.gid}
        isLoading={false}
        pathGenerator={this.props.pathGenerator}
        stateName={region.properties.state_gid.toString()}
        selectRegion={() => { }}
      />)
    })
  }

  shouldComponentUpdate (nextProps, nextState) {
    const shouldUpdate = shallowCompare(this, nextProps, nextState)
    return shouldUpdate
  }

  render () {
    return (
      <g className={classes.selectedRegions}>
        {this.renderSelectedRegions()}
      </g>
    )
  }
}

AdministrativeLayerSelectedComponent.propTypes = {
  'selectedRegion': PropTypes.object,
  'regionsGeoJson': PropTypes.object.isRequired,
  'selectedStreamCentroid': PropTypes.object,
  'isOffline': PropTypes.bool.isRequired,
  'cachedRegions': PropTypes.object.isRequired,
  pathGenerator: PropTypes.func.isRequired,
}

export default AdministrativeLayerSelectedComponent
