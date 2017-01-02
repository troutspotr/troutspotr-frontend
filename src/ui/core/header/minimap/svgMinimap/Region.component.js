import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const RegionComponent = React.createClass({
  propTypes: {
    geoJson: PropTypes.object.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    pathGenerator: PropTypes.func.isRequired,
    stateName: PropTypes.string.isRequired,

    selectRegion: PropTypes.func.isRequired
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
    let json = this.props.geoJson
    let path = this.props.pathGenerator(json.geometry)
    return (
      <Link onClick={e => this.props.selectRegion(e, json)} to={`/${this.props.stateName.toLowerCase()}/${json.properties.name.toLowerCase()}`}>
        <path data-name={json.properties.name} d={path} />
      </Link>)
  }
})
export default RegionComponent
