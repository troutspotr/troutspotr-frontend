import React, { PropTypes } from 'react'
// import { Link } from 'react-router'

const MapboxGlComponent = React.createClass({
  propTypes: {
    mapbox: PropTypes.object.isRequired,
    elementId: PropTypes.string.isRequired
  },

  onClick () {

  },

  componentDidMount () {
    console.log('MAP MOUNTED')
    this.map = new this.props.mapbox.Map({
      container: this.props.elementId, // container id
      style: 'mapbox://styles/mapbox/dark-v9', // stylesheet location
      center: [-74.50, 40], // starting position
      zoom: 9 // starting zoom
    })
  },

  render () {
    return null
  }
})
export default MapboxGlComponent
