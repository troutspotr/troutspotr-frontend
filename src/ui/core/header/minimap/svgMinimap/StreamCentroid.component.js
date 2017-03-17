import React, { PropTypes } from 'react'
import classes from './SvgMap.scss'
const StreamCentroidComponent = React.createClass({
  propTypes: {
    geoJson: PropTypes.object.isRequired,
    pathGenerator: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
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

  render () {
    let json = { type: 'Point', coordinates: this.props.geoJson.centroid, properties: this.props.geoJson }
    let path = this.props.pathGenerator(json)
    return (<path className={this.props.isOpen ? classes.open : classes.closed} data-name={json.properties.name} d={path} />)
  }
})
export default StreamCentroidComponent
