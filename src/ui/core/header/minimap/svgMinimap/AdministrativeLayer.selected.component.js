import React, { PropTypes, Component } from 'react'
import RegionComponent from './Region.component'
import { isEmpty, has } from 'lodash'
import shallowCompare from 'shallow-compare'
import classes from './SvgMap.scss'

class AdministrativeLayerSelectedComponent extends Component {
  renderSelectedRegions () {
    let { selectedRegion, regionsGeoJson, selectedStreamCentroid } = this.props
    let isStreamSelected = isEmpty(selectedStreamCentroid) === false
    if (isStreamSelected) {
      // if thre's a selected stream, we don't have to display the selected region.
      // it's pretty obvious.
      return null
    }
    let selectedRegionId = isEmpty(selectedRegion) === false
      ? selectedRegion.properties.name.toLowerCase()
      : null
    if (selectedRegionId == null) {
      return null
    }

    let selectedRegions = regionsGeoJson.features.filter(f => f.properties.name.toLowerCase() === selectedRegionId)
    if (selectedRegions.length === 0) {
    }

    return selectedRegions.map((region, index) => {
      let { isOffline, cachedRegions } = this.props
      let isCached = isOffline && has(cachedRegions, region.properties.gid)
      let isActive = isOffline === false || isCached
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
    let shouldUpdate = shallowCompare(this, nextProps, nextState)
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
  selectedRegion: PropTypes.object,
  regionsGeoJson: PropTypes.object.isRequired,
  selectedStreamCentroid: PropTypes.object,
  isOffline: PropTypes.bool.isRequired,
  cachedRegions: PropTypes.object.isRequired
}

export default AdministrativeLayerSelectedComponent
