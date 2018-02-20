import * as React from 'react'
import { ICameraProps } from 'ui/core/map/ICameraProps'
import { Map } from 'mapbox-gl'
import isEqual from 'lodash-es/isEqual'
export interface IMapboxGlCameraProps {
  camera: ICameraProps
  map: Map
}

export default class MapboxGlComponentCamera extends React.PureComponent<IMapboxGlCameraProps> {
  updateCamera(camera: ICameraProps, map: Map) {
    const { bbox, padding } = camera
    if (bbox == null) {
      return
    }
    if (padding == null) {
      map.fitBounds(bbox)
    } else {
      map.fitBounds(bbox, {
        padding,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { camera, map } = nextProps
    const currentcamera = this.props.camera
    if (camera == null) {
      return
    }

    if (camera != null && isEqual(camera, currentcamera) === false) {
      this.updateCamera(camera, map)
    }

    const { bearing, pitch } = camera
    if (this.props.camera.bearing !== bearing && bearing != null) {
      map.setBearing(bearing)
    }

    if (this.props.camera.pitch !== pitch && pitch != null) {
      map.setPitch(pitch)
    }
  }

  componentDidMount() {
    const { camera, map } = this.props
    this.updateCamera(camera, map)
  }

  render() {
    return null
  }
}
