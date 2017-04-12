'use strict'

import React, { PropTypes, Component } from 'react'

class MapboxGlComponentCamera extends Component {
  setBounds ({ bounds, bearing = 0, angle = 0, animationSpeed = 1.4, pixelBuffer = 80 }) {
    if (this.props.map == null) {
      /* eslint-disable no-console */
      console.warn('Map was driven prior to being available.')
      /* eslint-enable no-alert */
      return
    }

    let mapBounds = this.props.mapbox.LngLatBounds.convert(bounds)
    this.props.map.easeTo({ bearing: bearing, pitch: angle })
    this.props.map.fitBounds(mapBounds, { speed: animationSpeed,
      padding: pixelBuffer,
      pitch: bearing
    })
  }

  // setOrientation ({ bearing, angle }) {
  //   this.props.map.setBearing(angle)
  //   this.props.map.setPitch(bearing)
  // },

  componentWillUpdate (nextProps) {
  }

  // update camera takes priority. If there are two changes at once,
  // only update camera position - not bearing or angle.
  updateCamera (camera, previousCamera) {
    let isBoundsChanged = previousCamera.bounds !== camera.bounds
    if (isBoundsChanged) {
      this.setBounds(camera)
    }
  }

  componentDidUpdate (previousProps) {
    if (this.props.map == null) {
      /* eslint-disable no-console */
      console.warn('Map was driven prior to being available.')
      /* eslint-enable no-console */
      return
    }

    // update camera takes priority. If there are two changes at once,
    // only update camera position - not bearing or angle.
    this.updateCamera(this.props.camera, previousProps.camera)
  }

  componentWillUnmount () {

  }

  render () {
    return null
  }
}

MapboxGlComponentCamera.propTypes = {
  camera: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  mapbox: PropTypes.object.isRequired
}

export default MapboxGlComponentCamera
