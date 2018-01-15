import * as React from 'react'
// require('mapbox-gl/dist/mapbox-gl.css')
// require('mapbox-gl/dist/svg/mapboxgl-ctrl-compass.svg')
// require('mapbox-gl/dist/svg/mapboxgl-ctrl-geolocate.svg')
// require('mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-in.svg')
// require('mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-out.svg')
require('./somebullshit.css')
import MapboxGlCamera from './MapboxGl.component.camera'
import { ICameraProps } from '../ICameraProps'
import * as mapboxGl from 'mapbox-gl'
import * as GeoJSON from 'geojson'

const token = 'pk.eyJ1IjoiYW5kZXN0MDEiLCJhIjoibW02QnJLSSJ9._I2ruvGf4OGDxlZBU2m3KQ'
// https://stackoverflow.com/a/44393954
Object.getOwnPropertyDescriptor(mapboxGl, 'accessToken').set(token)

export interface IMapboxGlProps {
  readonly onFeaturesSelected: (t: any) => void
  readonly onMapInitialized: (t: boolean) => void
  readonly style: mapboxGl.Style | string
  readonly camera: ICameraProps
}

export class MapboxGlComponent extends React.Component<IMapboxGlProps> {
  private map: mapboxgl.Map
  private mapContainer: HTMLDivElement
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.getInteractiveFeaturesOverPoint = this.getInteractiveFeaturesOverPoint.bind(this)
    this.onDataLoad = this.onDataLoad.bind(this)
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
    if (this.props.style !== nextStyle) {
      this.map.setStyle(nextStyle)
    }
  }

  getInteractiveFeaturesOverPoint(
    point
  ): Array<
    GeoJSON.Feature<
      mapboxGl.GeoJSONGeometry,
      {
        [name: string]: any
      }
    >
  > {
    const BOX_DIMENSION = 2
    const boundingBox = [
      [point.x - BOX_DIMENSION / 2, point.y - BOX_DIMENSION / 2],
      [point.x + BOX_DIMENSION / 2, point.y + BOX_DIMENSION / 2],
    ]

    const features = this.map.queryRenderedFeatures(boundingBox)

    return features
  }

  componentDidMount() {
    this.map = new mapboxGl.Map({
      container: this.mapContainer,
      style: this.props.style,
      center: [-93.5, 42],
      zoom: 4,
    })

    // inactivate rotation.
    this.map.dragRotate.disable()
    this.map.touchZoomRotate.disableRotation()
    this.map.on('click', this.onClick)
    this.map.on('load', this.onDataLoad)
  }

  onDataLoad(e) {
    this.map.setStyle(this.props.style)
    this.props.onMapInitialized(true)
  }

  componentWillUnmount() {
    if (this.map) {
      // adding and removing lots of maps
      // can cause a pretty bad memory leak
      // https://github.com/mapbox/mapbox-gl-js/issues/3264

      // remove events to be safe.
      // this component instance is gonna go away, but
      // GC is a mystery to some 👻
      this.map.off('click', this.onClick)

      // guh-bye!
      this.map.remove()
    }
    this.map = null
  }

  render() {
    const style = {
      width: '100%',
      height: '100%',
      touchAction: 'none',
    }
    return (
      <div style={style} ref={el => (this.mapContainer = el)}>
        {this.map != null && <MapboxGlCamera camera={this.props.camera} map={this.map} />}
      </div>
    )
  }
}
