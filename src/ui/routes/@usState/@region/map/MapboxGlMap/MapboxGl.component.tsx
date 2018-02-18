import * as React from 'react'
import MapboxGlComponentCamera from './MapboxGl.component.camera'
const classes = require('../Map.scss')
import MapboxGlLayerComponent from './MapboxGl.component.layer'
import { clamp, debounce, flatten, isEmpty } from 'lodash'
import BaseStyle from './styles/Base.style'
import MapboxGlGpsLayer from './MapboxGl.gps.layer'
class MapboxGlComponent extends React.Component<any> {
  protected map: any = null
  protected proxyOnLayerMouseOver: any
  protected proxyOnClick: any

  onClick() {}

  componentDidMount() {
    this.map = new this.props.mapbox.Map({
      attributionControl: true,
      container: this.props.elementId,
      style: BaseStyle,
      center: [-93.5, 42],
      zoom: 4,
      maxZoom: 18.0,
      boxZoom: false,
      dragRotate: true,
      keyboard: false,
    })

    // SetTimeout(() => { this.map.resize() }, 20)

    if (this.props.camera.bounds != null) {
      // Overpad the map just a bit, and an instant later, zoom out, set max bounds, and zoom back in.
      this.map.fitBounds(this.props.camera.bounds, { linear: false, padding: 20, speed: 1000 })
      setTimeout(() => {
        const zoomedOut = this.map.getZoom() * 0.8
        this.map.setZoom(zoomedOut)
        this.map.fitBounds(this.props.camera.bounds, { linear: false, padding: 80, speed: 100 })
      }, 100)
    }

    this.map.dragRotate.disable()
    this.map.touchZoomRotate.disableRotation()
    this.props.setIsMapInitialized(false)
    this.map.once('load', this.onMapLoad)
    this.map.once('data', this.onDataLoad)

    // Load interactivity.
    const DEBOUNCE_DELAY_MS = 80
    const debounceOptions = { maxWait: 20 }

    // We should debounce our events to reduce load on CPU.
    this.proxyOnLayerMouseOver = debounce(this.onLayerMouseOver, DEBOUNCE_DELAY_MS, debounceOptions)
    this.proxyOnClick = debounce(this.onLayerClick, 20, { maxWait: 20 })

    this.map.on('mousemove', this.proxyOnLayerMouseOver)
    this.map.on('click', this.proxyOnClick)
  }

  onLayerMouseOver = e => {
    const features = this.getInteractiveFeaturesOverPoint(e.point)
    if (features == null) {
      return
    }

    this.map.getCanvas().style.cursor = features.length ? 'pointer' : ''
    if (this.props.onFeatureHover != null) {
      if (features == null || features.length === 0) {
        return
      }

      this.props.onFeatureHover(features[0])
    }
  }

  getInteractiveFeaturesOverPoint = point => {
    const BOX_DIMENSION = 20
    const boundingBox = [
      [point.x - BOX_DIMENSION / 2, point.y - BOX_DIMENSION / 2],
      [point.x + BOX_DIMENSION / 2, point.y + BOX_DIMENSION / 2],
    ]

    const interactiveLayers = flatten(this.props.layerPackage.map(x => x.layers))
      .filter(layer => (layer as any).layerDefinition.interactive)
      .map(layer => (layer as any).layerDefinition.id)
    const features = this.map.queryRenderedFeatures(boundingBox, { layers: interactiveLayers })
    return features
  }

  onLayerClick = e => {
    const features = this.getInteractiveFeaturesOverPoint(e.point)
    if (features == null || features.length === 0) {
      return
    }
    this.props.onFeatureClick(features)
  }

  componentWillReceiveProps(nextProps) {
    const { isReadyToInsertLayers } = nextProps

    // Did our geoJson change?
    if (isReadyToInsertLayers === false) {
      return
    }
    const { sources } = this.props
    const isSourceChanged = sources !== nextProps.sources
    if (isSourceChanged) {
      this.safelySetSources(this.map, nextProps.sources)
    }

    const isUserLookingAtMap = isEmpty(nextProps.isVisible)
    const isUserHitBackButton =
      isEmpty(this.props.selectedGeometry) === false && isEmpty(nextProps.selectedGeometry)
    const userChangedRegions = this.props.selectedRegionId !== nextProps.selectedRegionId
    const shouldBounceOutALittle = isUserLookingAtMap && isUserHitBackButton
    if (userChangedRegions === false && shouldBounceOutALittle) {
      const currentZoom = this.map.getZoom()
      const newZoom = this.getZoomBackbounce(currentZoom)
      setTimeout(() => this.map.easeTo({ bearing: 0, pitch: 0, zoom: newZoom }), 30)
    }
  }

  getZoomBackbounce(currentZoom, minZoom = 10, maxZoom = 15, boostMultiplier = 3.5) {
    const clampedZoom = clamp(currentZoom, minZoom, maxZoom)
    const normalizedBoost = (clampedZoom - minZoom) / (maxZoom - minZoom)
    const boostBack = normalizedBoost * boostMultiplier + 0.2
    return currentZoom - boostBack
  }

  zoomOutALittle() {}

  setSourceOnStyleLoad(e) {}

  safelySetSources(map, sources) {
    sources.forEach(source => {
      const { sourceId, sourceData } = source
      const jsonSource = {
        type: 'geojson',
        data: sourceData,
      }
      const mapSource = map.getSource(sourceId)
      if (mapSource == null) {
        map.addSource(sourceId, jsonSource)
      } else {
        mapSource.setData(sourceData)
      }
    })
  }

  onMapLoad = e => {}

  onDataLoad = e => {
    if (e.dataType !== 'style') {
      return
    }

    // Add our satellite source first:
    const satelliteId = 'mapbox://mapbox.satellite'
    if (this.map.getSource(satelliteId) == null) {
      this.map.addSource(satelliteId, {
        url: 'mapbox://mapbox.satellite',
        type: 'raster',
        tileSize: 256,
      })
    }

    this.safelySetSources(this.map, this.props.sources)
    this.props.setIsMapInitialized(true)
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove()
      this.props.setIsMapInitialized(false)
    }
  }

  renderGpsLocationLayer() {
    if (this.props.isReadyToInsertLayers === false) {
      return null
    }

    const { gpsLocation } = this.props
    if (gpsLocation == null) {
      return null
    }
    return <MapboxGlGpsLayer map={this.map} source={gpsLocation} />
  }

  /*

*/
  render() {
    // Return null
    return (
      <div id={this.props.elementId} className={classes.map}>
        {this.props.isReadyToInsertLayers &&
          this.props.layerPackage.map((mapLayer, index) => (
            <MapboxGlLayerComponent
              map={this.map}
              key={mapLayer.layerId}
              layers={mapLayer.layers}
              filters={mapLayer.filters}
            />
          ))}
        {this.renderGpsLocationLayer()}
        {this.props.isReadyToInsertLayers && (
          <MapboxGlComponentCamera
            camera={this.props.camera}
            map={this.map}
            mapbox={this.props.mapbox}
          />
        )}
      </div>
    )
  }
}

// MapboxGlComponent.propTypes = {
//   'mapbox': PropTypes.object.isRequired,
//   'elementId': PropTypes.string.isRequired,
//   'camera': PropTypes.object.isRequired,
//   'setIsMapInitialized': PropTypes.func.isRequired,
//   'isReadyToInsertLayers': PropTypes.bool.isRequired,
//   'sources': PropTypes.array.isRequired,
//   'layerPackage': PropTypes.array.isRequired,
//   'selectedGeometry': PropTypes.object,
//   'selectedRegionId': PropTypes.string.isRequired,
//   'onFeatureClick': PropTypes.func.isRequired,
//   'onFeatureHover': PropTypes.func.isRequired,
//   /* eslint-disable react/no-unused-prop-types */
//   'isVisible': PropTypes.bool.isRequired,
//   'gpsLocation': PropTypes.object,

// }

export default MapboxGlComponent
