import { Map } from 'mapbox-gl'
import * as React from 'react'
// import { ICameraProps } from 'ui/core/map/ICameraProps'

export interface IMapboxGlFilterPassedProps {
  map?: Map
}

export interface IMapboxGlFilterDispatchProps {}

export interface IMapboxGlFilterStateProps {
  layerId: string,
  filter: any[]
}

export interface IMapboxGlCameraProps
  extends IMapboxGlFilterPassedProps,
  IMapboxGlFilterDispatchProps,
  IMapboxGlFilterStateProps {}

export class MapboxGlComponentFilter extends React.Component<IMapboxGlCameraProps> {
  public updateFilter(map: Map, layerId: string, filter: any[]) {
    if (map == null) {
      console.error('map was undefined in filter')
      return
    }

    console.log('style-loaded?', map.isStyleLoaded())
    if (map.isStyleLoaded() === false) {
      // return
    }
    //   map.once('styledata', () => {
    //     map.setFilter(layerId, filter)
    //   })
    //   return
    // }
    map.setFilter(layerId, filter)
  }

  public componentDidMount() {
    const { filter, layerId, map } = this.props
    if (map == null) {
      console.error('map was undefined in filter')
      return
    }

    this.updateFilter(map, layerId, filter)
  }

  public shouldComponentUpdate(): boolean {
    return true
  }

  public componentDidUpdate() {
    const { filter, layerId, map } = this.props
    this.updateFilter(map, layerId, filter)
  }

  public componentWillUnmount() {
    const { layerId, map } = this.props
    this.updateFilter(map, layerId, null)
  }

  public render() {
    console.log(this.props)
    return null
  }
}
