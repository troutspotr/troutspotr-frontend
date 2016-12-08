import React, { PropTypes } from 'react'
import MapboxGlComponentCamera from './MapboxGl.component.camera'
import classes from '../Map.scss'
import MapboxGlLayerComponent from './MapboxGl.component.layer'
import { isEmpty, debounce, flatten, clamp } from 'lodash'
const MapboxGlComponent = React.createClass({
  propTypes: {
    mapbox: PropTypes.object.isRequired,
    elementId: PropTypes.string.isRequired,
    camera: PropTypes.object.isRequired,
    ground: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    interactivity: PropTypes.object.isRequired,
    setIsMapInitialized: PropTypes.func.isRequired,
    isReadyToInsertLayers: PropTypes.bool.isRequired,
    sources: PropTypes.array.isRequired,
    layerPackage: PropTypes.array.isRequired,
    isVisible: PropTypes.bool.isRequired,
    selectedGeometry: PropTypes.object,
    selectedRegionId: PropTypes.string.isRequired,
    onFeatureClick: PropTypes.func.isRequired,
    onFeatureHover: PropTypes.func.isRequired
  },

  onClick () {

  },

  componentDidMount () {
    console.log('MAP MOUNTED')
    this.map = new this.props.mapbox.Map({
      attributionControl: true,
      container: this.props.elementId,
      // style: 'mapbox://styles/andest01/ciwfc17nv00582ql7c7tbrk9h', // debug
      // style: 'mapbox://styles/andest01/ciw5ipcp000012koejqu756dc',
      style: 'mapbox://styles/andest01/civsy0pgb00022kkxcbqtcogh',
      center: [-93.50, 42],
      zoom: 4,
      maxZoom: 18,
      boxZoom: false,
      dragRotate: true,
      keyboard: false
    })

    // setTimeout(() => { this.map.resize() }, 20)

    if (this.props.camera.bounds != null) {
      // overpad the map just a bit, and an instant later, zoom out, set max bounds, and zoom back in.
      this.map.fitBounds(this.props.camera.bounds, { linear: false, padding: 20, speed: 1000 })
      setTimeout(() => {
        let zoomedOut = this.map.getZoom() * 0.80
        this.map.setZoom(zoomedOut)
        this.map.fitBounds(this.props.camera.bounds, { linear: false, padding: 80, speed: 100 })
      }, 100)
    }

    this.map.dragRotate.disable()
    this.map.touchZoomRotate.disableRotation()
    this.props.setIsMapInitialized(false)
    this.map.once('load', this.onMapLoad)
    this.map.once('data', this.onDataLoad)
    this.map.on('layer.add', e => { console.log(e) })

    // load interactivity.
    const DEBOUNCE_DELAY_MS = 80
    let debounceOptions = { maxWait: 20 }

    // We should debounce our events to reduce load on CPU.
    this.proxyOnLayerMouseOver = debounce(this.onLayerMouseOver, DEBOUNCE_DELAY_MS, debounceOptions)
    // this.proxyOnUpdateLayerFilter = debounce(this.updateLayerFilter, 20, { maxWait: 20 })
    this.proxyOnClick = debounce(this.onLayerClick, 20, { maxWait: 20 })

    this.map.on('mousemove', this.proxyOnLayerMouseOver)
    this.map.on('click', this.proxyOnClick)
  },

  onLayerMouseOver (e) {
    let features = this.getInteractiveFeaturesOverPoint(e.point)
    this.map.getCanvas().style.cursor = features.length ? 'pointer' : ''
    if (this.props.onFeatureHover != null) {
      if (features == null || features.length === 0) {
        return
      }

      this.props.onFeatureHover(features[0])
    }
  },

  getInteractiveFeaturesOverPoint (point) {
    let BOX_DIMENSION = 20
    let boundingBox = [
      [point.x - BOX_DIMENSION / 2, point.y - BOX_DIMENSION / 2],
      [point.x + BOX_DIMENSION / 2, point.y + BOX_DIMENSION / 2]
    ]

    let interactiveLayers = flatten(this.props.layerPackage.map(x => x.layers))
      .filter(layer => layer.layerDefinition.interactive)
      .map(layer => layer.layerDefinition.id)
    var features = this.map.queryRenderedFeatures(boundingBox, { layers: interactiveLayers })
    return features
  },

  onLayerClick (e) {
    let features = this.getInteractiveFeaturesOverPoint(e.point)
    if (features == null || features.length === 0) {
      return
    }
    console.log(features)
    this.props.onFeatureClick(features)
  },

  componentWillReceiveProps (nextProps) {
    let { isReadyToInsertLayers } = nextProps

    // did our geoJson change?
    if (isReadyToInsertLayers === false) {
      return
    }
    let { sources } = this.props
    let isSourceChanged = sources !== nextProps.sources
    if (isSourceChanged) {
      this.safelySetSources(this.map, nextProps.sources)
    }

    let isUserLookingAtMap = isEmpty(nextProps.isVisible)
    let isUserHitBackButton = isEmpty(this.props.selectedGeometry) === false && isEmpty(nextProps.selectedGeometry)
    let userChangedRegions = this.props.selectedRegionId !== nextProps.selectedRegionId
    let shouldBounceOutALittle = isUserLookingAtMap && isUserHitBackButton
    if (userChangedRegions === false && shouldBounceOutALittle) {
      let currentZoom = this.map.getZoom()
      let clampedZoom = Math.max(Math.min(currentZoom, 17), 12)
      let boostMultiplier = (clampedZoom - 11.5) / 4
      console.log(boostMultiplier)
      let newZoom = this.getZoomBackbounce(currentZoom)
      setTimeout(() => this.map.easeTo({ bearing: 0, pitch: 0, zoom: newZoom }), 30)
    }
  },

  getZoomBackbounce (currentZoom, minZoom = 10, maxZoom = 15, boostMultiplier = 3.5) {
    let clampedZoom = clamp(currentZoom, minZoom, maxZoom)
    let normalizedBoost = (clampedZoom - minZoom) / (maxZoom - minZoom)
    let boostBack = (normalizedBoost * boostMultiplier) + 0.2
    console.log(currentZoom, boostBack)
    return currentZoom - boostBack
  },

  zoomOutALittle () {

  },

  setSourceOnStyleLoad (e) {

  },

  safelySetSources (map, sources) {
    sources.forEach(source => {
      let { sourceId, sourceData } = source
      let jsonSource = {
        type: 'geojson',
        data: sourceData
      }
      let mapSource = map.getSource(sourceId)
      if (mapSource == null) {
        map.addSource(sourceId, jsonSource)
      } else {
        mapSource.setData(sourceData)
      }
    })
  },

  onMapLoad (e) {
    // console.log('map fully loaded', e)
  },

  onDataLoad (e) {
    if (e.dataType !== 'style') {
      return
    }

    this.safelySetSources(this.map, this.props.sources)
    this.props.setIsMapInitialized(true)
  },

  componentWillUnmount () {
    if (this.map) {
      this.map.remove()
      this.props.setIsMapInitialized(false)
    }
  },

  render () {
    // return null
    return (<div id={this.props.elementId} className={classes.map}>
      {this.props.isReadyToInsertLayers &&
        this.props.layerPackage.map((mapLayer, index) => {
          return (<MapboxGlLayerComponent
            map={this.map}
            key={index}
            layers={mapLayer.layers}
            filters={mapLayer.filters} />)
        })}
      {this.props.isReadyToInsertLayers && <MapboxGlComponentCamera
        camera={this.props.camera}
        map={this.map}
        mapbox={this.props.mapbox} /> }
    </div>)
  }
})
export default MapboxGlComponent
