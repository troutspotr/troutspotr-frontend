import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classes from './SvgMap.scss'

const StreamCentroidComponent = React.createClass({
  propTypes: {
    geoJson: PropTypes.object.isRequired,
    isSelected: PropTypes.bool.isRequired,
    pathGenerator: PropTypes.func.isRequired,
    projection: PropTypes.func.isRequired
  },

  componentWillMount () {
    // this.initializeMap()
  },

  componentDidMount () {
  },

  componentWillUnmount () {
  },

  selectRegion (e, region) {
  },

  zoomToRegion (region) {

  },

  // shouldComponentUpdate (nextProps, nextState) {
  //   let isSame = nextProps.geoJson === this.props.geoJson
  //   return isSame === false
  // },

  render () {
    let json = { type: 'Point', coordinates: this.props.geoJson.centroid, properties: this.props.geoJson }
    let path = this.props.pathGenerator(json)
    return (<path data-name={json.properties.name} d={path} />)
  }
})
export default StreamCentroidComponent
