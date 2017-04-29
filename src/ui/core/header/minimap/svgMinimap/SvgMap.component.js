import React, { PropTypes, Component } from 'react'
import * as d3 from 'd3-geo'
import classes from './SvgMap.scss'
import RegionComponent from './Region.component'
import { isEmpty, has } from 'lodash'
import StreamCentroidComponent from './StreamCentroid.component'

import AdministrativeLayer from './AdministrativeLayer.component'
import CentroidsLayer from './CentroidsLayer.component'
import GpsLocationLayer from './GpsLocationLayer.component'

export const getProjectionFromFeature = (feature, { width, height, radius, buffer = 2 }) => {
  let streamGeometry = feature
  let diameter = radius * 2
  let centroid = d3.geoCentroid(streamGeometry)

  let lower = [(width - diameter) / 2 + buffer, (height - diameter) / 2 + buffer]
  let upper = [width - lower[0], height - lower[1]]
  let projection = d3.geoOrthographic()
    .rotate([-centroid[0], -centroid[1], 0])
    .fitExtent([lower, upper], feature)

  return projection
}

class SvgMapComponent extends Component {
  componentWillMount () {
    this.initializeMap()
  }

  initializeMap () {
    this.projection = getProjectionFromFeature(this.props.statesGeoJson,
        { width: this.props.width, height: this.props.height, radius: Math.min(this.props.width, this.props.height) * 0.5 })

    this.pathGenerator = d3.geoPath()
      .projection(this.projection)
      .pointRadius(0.3)

    this.selectedCentroidPathGenerator = d3.geoPath()
      .projection(this.projection)
      .pointRadius(1.6)
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  onSelectState (e) {
  }

  selectRegion (e, region) {
  }

  zoomToRegion (region) {

  }

  renderStates () {
    let { statesGeoJson } = this.props
    let paths = statesGeoJson.features.map((state, index) => {
      let path = this.pathGenerator(state.geometry)
      return (<path
        key={state.properties.gid}
        d={path}
              />)
    })
    return (<g className={classes.states}>
      {paths}
    </g>)
  }

  renderCounties () {
    return null
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
        pathGenerator={this.pathGenerator}
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
      pathGenerator={this.pathGenerator}
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

  renderStreamCentroids () {
    let { streamCentroidsGeoJson } = this.props
    if (isEmpty(streamCentroidsGeoJson)) {
      return null
    }

    let decidedNotToRenderTheseThings = true
    if (decidedNotToRenderTheseThings) {
      return null
    }

    let paths = streamCentroidsGeoJson.map((centroid, index) => {
      let isOpen = this.props.getIsOpen(centroid.waterId)
      return (
        <StreamCentroidComponent
          geoJson={centroid}
          key={centroid.gid}
          isSelected={index % 2 === 0}
          isLoading={index < 400}
          isOpen={isOpen}
          pathGenerator={this.pathGenerator}
          projection={this.projection}
        />)
    })
    return (<g className={classes.centroids}>
      {paths}
    </g>)
  }

  renderGpsCoorinates = () => {
    let { currentGpsCoordinatesFeature } = this.props
    if (currentGpsCoordinatesFeature == null) {
      return null
    }
    let path = this.selectedCentroidPathGenerator(currentGpsCoordinatesFeature)
    
    let pathElement = (<path
      className={classes.gpsCoordinates}
      data-name='gps-location'
      d={path} />)
    return pathElement
  }

  renderSelectedStreamCentroid () {
    let { selectedStreamCentroid } = this.props
    if (selectedStreamCentroid == null) {
      return null
    }
    console.log(selectedStreamCentroid)

    return (
      <StreamCentroidComponent
        geoJson={selectedStreamCentroid}
        isSelected
        isOpen={this.props.getIsOpen(selectedStreamCentroid.waterId)}
        isLoading={false}
        pathGenerator={this.selectedCentroidPathGenerator}
        projection={this.projection}
      />)
  }

  render () {
    return (
      <svg
        id='minimap'
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        height={this.props.height + 'px'}
        width={this.props.width + 'px'}
        preserveAspectRatio='xMidYMid meet'
      >
      <AdministrativeLayer {...this.props} projection={this.projection} pathGenerator={this.pathGenerator} />
      <CentroidsLayer {...this.props}
        projection={this.projection}
        pathGenerator={this.pathGenerator}
        selectedCentroidPathGenerator={this.selectedCentroidPathGenerator} />
      <GpsLocationLayer {...this.props}
        projection={this.projection}
        pathGenerator={this.pathGenerator}
        selectedCentroidPathGenerator={this.selectedCentroidPathGenerator} />
      </svg>
    )
  }
}


/*
<g className={classes.counties}>
        //   {this.renderCounties()}
        // </g>
        // {this.renderStates()}
        // {this.renderRegions()}
        // <g className={classes.selectedRegions}>
        //   {this.renderSelectedRegions()}
        // </g>
        // <g className={classes.centroids} style={{ opacity: this.props.isStreamCentroidsDisplayed ? 1 : 0 }}>
        //   {this.renderStreamCentroids()}
        // </g>
        // <g className={classes.selectedStreamCentroid}>
        //   {this.renderSelectedStreamCentroid()}
        // </g>
        // <g className={classes.gpsCoordinates}>
        //   {this.renderGpsCoorinates()}
        // </g>

*/
SvgMapComponent.propTypes = {
  statesGeoJson: PropTypes.object.isRequired,
  regionsGeoJson: PropTypes.object.isRequired,
  streamCentroidsGeoJson: PropTypes.array,
  selectedRegion: PropTypes.object,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  getIsOpen: PropTypes.func.isRequired,
  isStreamCentroidsDisplayed: PropTypes.bool.isRequired,
  // location: PropTypes.object.isRequired,
  selectedStreamCentroid: PropTypes.object,
  cachedRegions: PropTypes.object.isRequired,
  selectRegion: PropTypes.func.isRequired,
  isOffline: PropTypes.bool.isRequired,
  currentGpsCoordinatesFeature: PropTypes.object
}

export default SvgMapComponent
