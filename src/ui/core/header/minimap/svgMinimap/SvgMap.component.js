import React, { PropTypes } from 'react'
import * as d3 from 'd3-geo'
import classes from './SvgMap.scss'
import RegionComponent from './Region.component'
import { isEmpty } from 'lodash'
import StreamCentroidComponent from './StreamCentroid.component'

const getProjectionFromFeature = (feature, { width, height, radius }) => {
  let streamGeometry = feature
  let diameter = radius * 2
  let centroid = d3.geoCentroid(streamGeometry)

  let lower = [(width - diameter) / 2 + 2, (height - diameter) / 2 + 2]
  let upper = [width - lower[0], height - lower[1]]
  let projection = d3.geoOrthographic()
    .rotate([-centroid[0], -centroid[1], 0])
    .fitExtent([lower, upper], feature)

  return projection
}

const SvgMapComponent = React.createClass({
  propTypes: {
    statesGeoJson: PropTypes.object.isRequired,
    countiesGeoJson: PropTypes.object.isRequired,
    regionsGeoJson: PropTypes.object.isRequired,
    streamCentroidsGeoJson: PropTypes.array,
    selectedRegion: PropTypes.object,
    selectedState: PropTypes.object,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    // location: PropTypes.object.isRequired,
    selectedStreamCentroid: PropTypes.object,

    selectRegion: PropTypes.func.isRequired
  },

  componentWillMount () {
    this.initializeMap()
  },

  initializeMap () {
    this.projection = getProjectionFromFeature(this.props.statesGeoJson,
        { width: this.props.width, height: this.props.height, radius: Math.min(this.props.width, this.props.height) * 0.5 })

    this.pathGenerator = d3.geoPath()
      .projection(this.projection)
      .pointRadius(0.4)

    this.selectedCentroidPathGenerator = d3.geoPath()
      .projection(this.projection)
      .pointRadius(1.6)
  },

  shouldComponentUpdate (nextProps, nextState) {
    let desiredProps = ['statesGeoJson',
      'countiesGeoJson',
      'regionsGeoJson',
      'streamCentroidsGeoJson',
      'selectedRegion',
      'selectedState',
      'width',
      'height',
      'selectedStreamCentroid']

    let differentProps = desiredProps.filter(prop => {
      let isDifferent = nextProps[prop] !== this.props[prop]
      if (isDifferent) {
        console.log('mismatch!', prop)
      }
      return isDifferent
    })

    return differentProps.length > 1
  },

  componentDidMount () {
  },

  componentWillUnmount () {
  },

  onSelectState (e) {
  },

  selectRegion (e, region) {
  },

  zoomToRegion (region) {

  },

  renderStates () {
    let { statesGeoJson } = this.props
    let paths = statesGeoJson.features.map((state, index) => {
      let path = this.pathGenerator(state.geometry)
      return <path
        key={index}
        d={path} />
    })
    return (<g className={classes.states}>
      {paths}
    </g>)
  },

  renderCounties () {
    return null
  },

  renderRegions () {
    let { regionsGeoJson } = this.props
    let paths = regionsGeoJson.features.map((region, index) => {
      return (
        <RegionComponent
          geoJson={region}
          isSelected={false}
          isLoading={false}
          pathGenerator={this.pathGenerator}
          stateName={FAKE_STATE_NAME}
          selectRegion={this.props.selectRegion} />)
    })
    return (<g className={classes.regions}>
      {paths}
    </g>)
  },

  renderStreamCentroids () {
    let { streamCentroidsGeoJson } = this.props
    if (isEmpty(streamCentroidsGeoJson)) {
      return null
    }

    let paths = streamCentroidsGeoJson.map((centroid, index) => {
      return (
        <StreamCentroidComponent
          geoJson={centroid}
          isSelected={index % 2 === 0}
          isLoading={index < 400}
          pathGenerator={this.pathGenerator}
          projection={this.projection} />)
    })
    return (<g className={classes.centroids}>
      {paths}
    </g>)
  },

  renderSelectedStreamCentroid () {
    let { selectedStreamCentroid } = this.props
    if (selectedStreamCentroid == null) {
      return null
    }

    return (
      <StreamCentroidComponent
        geoJson={selectedStreamCentroid}
        isSelected
        isLoading={false}
        pathGenerator={this.selectedCentroidPathGenerator}
        projection={this.projection} />)
  },

  render () {
    console.log('render svg map')
    return (
      <svg
        id='minimap'
        viewbox={`0 0 ${this.props.width} ${this.props.height}`}
        height={this.props.height + 'px'}
        width={this.props.width + 'px'}
        preserveAspectRatio='xMidYMid meet'>
        <g className={classes.counties}>
          {this.renderCounties()}
        </g>
        {this.renderStates()}
        {this.renderRegions()}
        <g className={classes.centroids}>
          {this.renderStreamCentroids()}
        </g>
        <g className={classes.selectedStreamCentroid}>
          {this.renderSelectedStreamCentroid()}
        </g>
      </svg>
    )
  }
})

const FAKE_STATE_NAME = 'mn'
export default SvgMapComponent
