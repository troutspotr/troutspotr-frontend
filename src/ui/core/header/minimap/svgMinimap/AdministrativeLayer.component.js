import React, { PropTypes, Component } from 'react'
import classes from './SvgMap.scss'
import RegionComponent from './Region.component'
import { isEmpty, has } from 'lodash'

class AdministrativeLayerComponent extends Component {
  renderStates () {
    let { statesGeoJson } = this.props
    let paths = statesGeoJson.features.map((state, index) => {
      let path = this.props.pathGenerator(state.geometry)
      return (<path
        key={state.properties.gid}
        d={path}
              />)
    })
    return (<g className={classes.states}>
      {paths}
    </g>)
  }

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

  createRegionComponent (region, index, isCached, isActive, isSelected, isLoading) {
    return (<RegionComponent
      geoJson={region}
      isSelected={isSelected}
      isLoading={isLoading}
      isCached={isCached}
      isActive={isActive}
      key={index}
      pathGenerator={this.props.pathGenerator}
      stateName={region.properties.state_gid.toString()}
      selectRegion={this.props.selectRegion}
            />)
  }

  renderRegions () {
    let { regionsGeoJson } = this.props
    let { isOffline, cachedRegions } = this.props
    let orderDictionary = {
      top: [],
      bottom: []
    }

    let twoPaths = regionsGeoJson.features.reduce((dictionary, region, index) => {
      let preactIndexHack = index + 1
      let isCached = isOffline && has(cachedRegions, region.properties.gid)
      let isActive = isOffline === false || isCached
      let component = this.createRegionComponent(region, preactIndexHack, isCached, isActive, false, false)
      if (isCached && isActive) {
        dictionary.top.push(component)
      } else {
        dictionary.bottom.push(component)
      }

      return dictionary
    }, orderDictionary)

    return (
      <g className={classes.regions}>
        {twoPaths.bottom}
        {twoPaths.top}
      </g>)
  }

  render () {
    return (
      <g className='administrative'>
        {this.renderStates()}
        {this.renderRegions()}
      </g>
    )
  }
}

AdministrativeLayerComponent.propTypes = {
  statesGeoJson: PropTypes.object.isRequired,
  regionsGeoJson: PropTypes.object.isRequired,
  selectedRegion: PropTypes.object,
  cachedRegions: PropTypes.object.isRequired,
  selectRegion: PropTypes.func.isRequired,
  isOffline: PropTypes.bool.isRequired
}

export default AdministrativeLayerComponent
