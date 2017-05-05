import React, { PropTypes, Component } from 'react'
import * as d3 from 'd3-geo'
import AdministrativeLayer from './AdministrativeLayer.component'
import AdministrativeLayerSelectedComponent from './AdministrativeLayer.selected.component'
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

  render () {
    return (
      <svg
        id='minimap'
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        height={this.props.height + 'px'}
        width={this.props.width + 'px'}
        preserveAspectRatio='xMidYMid meet'
      >
        <AdministrativeLayer
          statesGeoJson={this.props.statesGeoJson}
          regionsGeoJson={this.props.regionsGeoJson}
          cachedRegions={this.props.cachedRegions}
          isOffline={this.props.isOffline}
          projection={this.projection}
          pathGenerator={this.pathGenerator}
          selectRegion={this.props.selectRegion}
        />
        <CentroidsLayer
          streamCentroidsGeoJson={this.props.streamCentroidsGeoJson}
          getIsOpen={this.props.getIsOpen}
          isStreamCentroidsDisplayed={this.props.isStreamCentroidsDisplayed}
          selectedStreamCentroid={this.props.selectedStreamCentroid}
          projection={this.projection}
          pathGenerator={this.pathGenerator}
          selectedCentroidPathGenerator={this.selectedCentroidPathGenerator}
        />
        <AdministrativeLayerSelectedComponent
          selectedRegion={this.props.selectedRegion}
          projection={this.projection}
          pathGenerator={this.pathGenerator}
          regionsGeoJson={this.props.regionsGeoJson}
          selectedStreamCentroid={this.props.selectedStreamCentroid}
          isOffline={this.props.isOffline}
        />
        <GpsLocationLayer
          currentGpsCoordinatesFeature={this.props.currentGpsCoordinatesFeature}
          projection={this.projection}
          pathGenerator={this.pathGenerator}
          selectedCentroidPathGenerator={this.selectedCentroidPathGenerator}
        />
      </svg>
    )
  }
}

SvgMapComponent.propTypes = {
  statesGeoJson: PropTypes.object.isRequired,
  regionsGeoJson: PropTypes.object.isRequired,
  streamCentroidsGeoJson: PropTypes.array,
  selectedRegion: PropTypes.object,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  getIsOpen: PropTypes.func.isRequired,
  // location: PropTypes.object.isRequired,
  selectedStreamCentroid: PropTypes.object,
  cachedRegions: PropTypes.object.isRequired,
  selectRegion: PropTypes.func.isRequired,
  isOffline: PropTypes.bool.isRequired,
  currentGpsCoordinatesFeature: PropTypes.object
}

export default SvgMapComponent
