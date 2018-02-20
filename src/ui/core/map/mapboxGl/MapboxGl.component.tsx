import * as React from 'react'
require('mapbox-gl/dist/mapbox-gl.css')
require('mapbox-gl/dist/svg/mapboxgl-ctrl-compass.svg')
require('mapbox-gl/dist/svg/mapboxgl-ctrl-geolocate.svg')
require('mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-in.svg')
require('mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-out.svg')

import MapboxGlCamera from './MapboxGl.component.camera'
import { ICameraProps } from '../ICameraProps'
// import * as mapboxGl from 'mapbox-gl'
import { Style as MapboxStyle, Map } from 'mapbox-gl'
// import * as GeoJSON from 'geojson'

const token = 'pk.eyJ1IjoiYW5kZXN0MDEiLCJhIjoibW02QnJLSSJ9._I2ruvGf4OGDxlZBU2m3KQ'
// https://stackoverflow.com/a/44393954

export interface IMapboxGlProps {
  readonly onFeaturesSelected: (t: any) => void
  readonly onMapInitialized: (t: boolean) => void
  readonly style: MapboxStyle | string
  readonly camera?: ICameraProps
  readonly mapboxGl: any
}

export interface IMapboxGlState {
  readonly map: Map
  readonly isLoaded: boolean
}
export class MapboxGlComponent extends React.Component<IMapboxGlProps, IMapboxGlState> {
  private mapContainer: HTMLDivElement
  constructor(props, state) {
    super(props, state)
    this.onClick = this.onClick.bind(this)
    this.getInteractiveFeaturesOverPoint = this.getInteractiveFeaturesOverPoint.bind(this)
    this.onDataLoad = this.onDataLoad.bind(this)
    this.state = {
      map: null,
      isLoaded: false,
    }
  }

  onClick(e) {
    const features = this.getInteractiveFeaturesOverPoint(e.point)
    if (features == null || features.length === 0) {
      return
    }
    // const groups = groupBy(features, f => f.layer.id)
    this.props.onFeaturesSelected(features)
  }

  componentWillUpdate(nextProps) {
    const nextStyle = nextProps.style
    if (this.state.map != null && this.props.style !== nextStyle) {
      this.state.map.setStyle(nextStyle)
    }
  }

  getInteractiveFeaturesOverPoint(point): any {
    const BOX_DIMENSION = 2
    const boundingBox = [
      [point.x - BOX_DIMENSION / 2, point.y - BOX_DIMENSION / 2],
      [point.x + BOX_DIMENSION / 2, point.y + BOX_DIMENSION / 2],
    ]

    const features = this.state.map.queryRenderedFeatures(boundingBox)
    return features
  }

  componentDidMount() {
    const { mapboxGl } = this.props
    Object.getOwnPropertyDescriptor(mapboxGl, 'accessToken').set(token)
    const map = new mapboxGl.Map({
      container: this.mapContainer,
      style: this.props.style,
      center: [-93.5, 42],
      zoom: 4,
    })

    // inactivate rotation.
    map.dragRotate.disable()
    map.touchZoomRotate.disableRotation()
    map.on('click', this.onClick)
    // wait until we've loaded before setting the map property
    map.on('load', e => {
      // this.map = map
      this.setState(
        () => {
          return {
            map,
            isLoaded: true,
          }
        },
        () => {
          this.onDataLoad(e)
        }
      )
    })
  }

  onDataLoad(e) {
    this.state.map.setStyle(this.props.style)
    this.props.onMapInitialized(true)
  }

  componentWillUnmount() {
    if (this.state.map) {
      // adding and removing lots of maps
      // can cause a pretty bad memory leak
      // https://github.com/mapbox/mapbox-gl-js/issues/3264

      // remove events to be safe.
      // this component instance is gonna go away, but
      // GC is a mystery to some 👻
      this.state.map.off('click', this.onClick)

      // guh-bye!
      this.state.map.remove()
    }
  }

  render() {
    const style = {
      width: '100%',
      height: '100%',
      touchAction: 'none',
    }

    return (
      <div style={style} ref={el => (this.mapContainer = el)}>
        {this.state.isLoaded && <MapboxGlCamera camera={this.props.camera} map={this.state.map} />}
      </div>
    )
  }
}
