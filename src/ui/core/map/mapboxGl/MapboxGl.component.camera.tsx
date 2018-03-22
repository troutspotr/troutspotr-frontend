import { Map } from 'mapbox-gl'
import * as React from 'react'
import { ICameraProps } from 'ui/core/map/ICameraProps'
export interface IMapboxGlCameraProps {
  camera: ICameraProps
  map: Map
}

export default class MapboxGlComponentCamera extends React.PureComponent<IMapboxGlCameraProps> {
  public updateCamera(camera: ICameraProps, map: Map) {
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

  public componentDidMount() {
    const { camera, map } = this.props
    this.updateCamera(camera, map)
  }

  public render() {
    return null
  }
}
