import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './SvgMap.scss'
import RegionComponent from './Region.component'
import {has} from 'lodash'
import shallowCompare from 'shallow-compare'

class AdministrativeLayerComponent extends Component {
  renderStates () {
    const {statesGeoJson} = this.props
    const paths = statesGeoJson.features.map((state, index) => {
      const path = this.props.pathGenerator(state.geometry)
      return (<path
        key={state.properties.gid}
        d={path}
      />)
    })
    return (<g className={classes.states}>
      {paths}
    </g>)
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
    const {regionsGeoJson} = this.props
    const {isOffline, cachedRegions} = this.props
    const orderDictionary = {
      'top': [],
      'bottom': [],
    }

    const twoPaths = regionsGeoJson.features.reduce((dictionary, region, index) => {
      const preactIndexHack = index + 1
      const isCached = isOffline && has(cachedRegions, region.properties.gid)
      const isActive = isOffline === false || isCached
      const component = this.createRegionComponent(region, preactIndexHack, isCached, isActive, false, false)
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

  shouldComponentUpdate (nextProps, nextState) {
    const shouldUpdate = shallowCompare(this, nextProps, nextState)
    return shouldUpdate
  }

  render () {
    return (
      <g className="administrative">
        {this.renderStates()}
        {this.renderRegions()}
      </g>
    )
  }
}

AdministrativeLayerComponent.propTypes = {
  'statesGeoJson': PropTypes.object.isRequired,
  'regionsGeoJson': PropTypes.object.isRequired,
  'cachedRegions': PropTypes.object.isRequired,
  'isOffline': PropTypes.bool.isRequired,
  pathGenerator: PropTypes.func.isRequired,
  selectRegion: PropTypes.func.isRequired,
}

export default AdministrativeLayerComponent
