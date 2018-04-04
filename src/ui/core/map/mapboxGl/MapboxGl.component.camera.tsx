import { Map } from 'mapbox-gl'
import * as React from 'react'
import { ICameraProps } from 'ui/core/map/ICameraProps'

export interface IMapboxGlCameraPassedProps {
  map?: Map
}

export interface IMapboxGlCameraDispatchProps {}

export interface IMapboxGlCameraStateProps {
  camera: ICameraProps
}
export interface IMapboxGlCameraProps
  extends IMapboxGlCameraPassedProps,
    IMapboxGlCameraDispatchProps,
    IMapboxGlCameraStateProps {}

export default class MapboxGlComponentCamera extends React.PureComponent<IMapboxGlCameraProps> {
  public updateCamera(camera: ICameraProps, map: Map) {
    const { bbox, padding } = camera
    if (bbox == null) {
      return
    }
    if (padding == null) {
      setTimeout(() => map.fitBounds(bbox), 10)
    } else {
      setTimeout(
        () =>
          map.fitBounds(bbox, {
            padding,
          }),
        10
      )
    }
  }

  public componentDidMount() {
    const { camera, map } = this.props
    if (camera == null || map == null) {
      return
    }
    this.updateCamera(camera, map)
  }

  public render() {
    const { camera, map } = this.props
    if (camera == null) {
      return null
    }

    if (camera != null) {
      this.updateCamera(camera, map)
    }

    const { bearing, pitch } = camera
    if (this.props.camera.bearing != bearing && bearing != null) {
      map.setBearing(bearing)
    }

    if (this.props.camera.pitch != pitch && pitch != null) {
      map.setPitch(pitch)
    }

    return null
  }
}
