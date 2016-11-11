import React, { PropTypes } from 'react'
// import { Link } from 'react-router'

const MapboxGlComponent = React.createClass({
  propTypes: {
    mapbox: PropTypes.object.isRequired,
    elementId: PropTypes.string.isRequired,

    onMapLoadCallback: PropTypes.func.isRequired
  },

  onClick () {

  },

  componentDidMount () {
    console.log('MAP MOUNTED')
    this.map = new this.props.mapbox.Map({
      container: this.props.elementId, // container id
      style: 'mapbox://styles/andest01/citblizjo000z2hmlcmodgxxq', // stylesheet location
      center: [-74.50, 40], // starting position
      zoom: 9 // starting zoom
    })

    this.props.onMapLoadCallback(false)
    this.map.once('load', this.onMapLoad)
    this.map.on('data', this.onDataLoad)
    this.map.on('layer.add', e => { console.log(e) })
  },

  onMapLoad (e) {
    console.log('map fully loaded', e)
    // this.props.onMapLoadCallback(true)
  },

  onDataLoad (e) {
    if (e.dataType !== 'style') {
      return
    }

    console.log('data of some kind loaded...', e)
    this.props.onMapLoadCallback(true)
  },

  componentWillUnMount () {
    if (this.map) {
      this.map.remove()
    }
  },

  render () {
    return null
  }
})
export default MapboxGlComponent
