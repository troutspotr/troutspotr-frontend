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

    const { bearing, pitch } = camera
    console.log(pitch)
    const options = {
      bearing,
      pitch,
    }

    if (padding != null) {
      options['padding'] = padding
    }
    setTimeout(() => map.fitBounds(bbox, options), 10)
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
    
    return null
  }
}
