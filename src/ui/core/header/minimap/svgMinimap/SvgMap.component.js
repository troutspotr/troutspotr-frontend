import React, { PropTypes } from 'react'
import * as d3 from 'd3-geo'
import { Link } from 'react-router'
import classes from './SvgMap.scss'
import RegionComponent from './Region.component'
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

const REGION_INDEX = 2
const STATE_INDEX = 1

const SvgMapComponent = React.createClass({
  propTypes: {
    statesGeoJson: PropTypes.object.isRequired,
    countiesGeoJson: PropTypes.object.isRequired,
    regionsGeoJson: PropTypes.object.isRequired,
    streamCentroidsGeoJson: PropTypes.object.isRequired,
    selectedRegion: PropTypes.object,
    selectedState: PropTypes.object,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    location: PropTypes.object.isRequired,

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
      .pointRadius(0.1)
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

  swapRegion ({ pathname }, newRegion) {
    let stateId = 'mn'
    if (pathname == null) {
      return '/'
    }

    if (pathname === '/') {
      return `/${stateId}/${newRegion}`
    }

    let tokens = pathname.split('/')
    tokens[REGION_INDEX] = newRegion
    tokens[STATE_INDEX] = stateId
    let locationIsTooLong = tokens.length > 4
    if (locationIsTooLong) {
      tokens = tokens.slice(0, 4)
    }
    let newUrl = `${tokens.join('/')}`
    return newUrl
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
          isSelected={index % 2 === 0}
          isLoading={index < 3}
          pathGenerator={this.pathGenerator}
          stateName={'mn'}
          selectRegion={this.props.selectRegion} />)
    })
    return (<g className={classes.regions}>
      {paths}
    </g>)
  },

  renderStreamCentroids () {
    let { streamCentroidsGeoJson } = this.props
    let paths = streamCentroidsGeoJson.features.map((centroid, index) => {
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

  render () {
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
      </svg>
    )
  }
})
export default SvgMapComponent
