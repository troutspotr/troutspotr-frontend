import * as React from 'react'

class MapboxGlComponentCamera extends React.PureComponent<{}> {
  public setBounds({ bounds, bearing = 0, angle = 0, animationSpeed = 1.4, pixelBuffer = 80 }) {
    if (this.props.map == null) {
      /* eslint-disable no-console */
      console.warn('Map was driven prior to being available.')
      /* eslint-enable no-alert */
      return
    }

    const mapBounds = this.props.mapbox.LngLatBounds.convert(bounds)
    this.props.map.easeTo({ bearing, pitch: angle })
    this.props.map.fitBounds(mapBounds, {
      speed: animationSpeed,
      padding: pixelBuffer,
      pitch: bearing,
    })
  }

  public componentWillUpdate(nextProps) {}

  // Update camera takes priority. If there are two changes at once,
  // Only update camera position - not bearing or angle.
  public updateCamera(camera, previousCamera) {
    const isBoundsChanged = previousCamera.bounds !== camera.bounds
    if (isBoundsChanged) {
      this.setBounds(camera)
    }
  }

  public componentDidUpdate(previousProps) {
    if (this.props.map == null) {
      /* eslint-disable no-console */
      console.warn('Map was driven prior to being available.')
      /* eslint-enable no-console */
      return
    }

    // Update camera takes priority. If there are two changes at once,
    // Only update camera position - not bearing or angle.
    this.updateCamera(this.props.camera, previousProps.camera)
  }

  public componentWillUnmount() {}

  public render() {
    return null
  }
}

// MapboxGlComponentCamera.propTypes = {
//   'camera': PropTypes.object.isRequired,
//   'map': PropTypes.object.isRequired,
//   'mapbox': PropTypes.object.isRequired,
// }

export default MapboxGlComponentCamera
