import React, { PropTypes } from 'react'

const RegionComponent = React.createClass({
  propTypes: {
    geoJson: PropTypes.object.isRequired,
    pathGenerator: PropTypes.func.isRequired,
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

  onClick (e) {
    let json = this.props.geoJson

    this.props.selectRegion(e, json)
    // browserHistory.push(path)
  },

  render () {
    let json = this.props.geoJson
    let path = this.props.pathGenerator(json.geometry)
    return (
      <g onClick={this.onClick}>
        <path data-name={json.properties.name} d={path} />
      </g>)
  }
})
export default RegionComponent
