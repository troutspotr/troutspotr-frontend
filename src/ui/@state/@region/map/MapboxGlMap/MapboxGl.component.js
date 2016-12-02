import React, { PropTypes } from 'react'
import MapboxGlComponentCamera from './MapboxGl.component.camera'
import classes from '../Map.scss'
import MapboxGlLayerComponent from './MapboxGl.component.layer'
import { isEmpty } from 'lodash'
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
    onFeatureClick: PropTypes.func.isRequires,
    onFeatureHover: PropTypes.func.isRequires
  },

  onClick () {

  },

  componentDidMount () {
    console.log('MAP MOUNTED')
    this.map = new this.props.mapbox.Map({
      attributionControl: true,
      container: this.props.elementId,
      style: 'mapbox://styles/andest01/ciw5ipcp000012koejqu756dc',
      center: [-93.50, 42],
      zoom: 4,
      maxZoom: 18
      // boxZoom: false,
      // dragRotate: false,
      // keyboard: false
    })

    // setTimeout(() => { this.map.resize() }, 20)

    if (this.props.camera.bounds != null) {
      // overpad the map just a bit, and an instant later, zoom out, set max bounds, and zoom back in.
      this.map.fitBounds(this.props.camera.bounds, { linear: false, padding: 20, speed: 1000 })
      setTimeout(() => {
        let zoomedOut = this.map.getZoom() * 0.80
        this.map.setZoom(zoomedOut)
        // let currentBounds = this.map.getBounds()
        // this.map.setMaxBounds(currentBounds)
        this.map.fitBounds(this.props.camera.bounds, { linear: false, padding: 80, speed: 100 })
      }, 100)
    }

    this.map.dragRotate.disable()
    this.map.touchZoomRotate.disableRotation()
    this.props.setIsMapInitialized(false)
    this.map.once('load', this.onMapLoad)
    this.map.once('data', this.onDataLoad)
    this.map.on('layer.add', e => { console.log(e) })
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
    let shouldBounceOutALittle = isUserLookingAtMap && isUserHitBackButton
    if (shouldBounceOutALittle) {
      let currentZoom = this.map.getZoom()

      if (currentZoom > 9) {
        this.map.zoomTo(currentZoom * 0.9)
      }
    }
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

  // shouldComponentUpdate () {
  //   return false
  // },

  onMapLoad (e) {
    console.log('map fully loaded', e)
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
        this.props.layerPackage.map(mapLayer => {
          return (<MapboxGlLayerComponent
            map={this.map}
            layers={mapLayer.layers}
            filters={mapLayer.filters}
            onFeatureClick={this.props.onFeatureClick}
            onFeatureHover={this.props.onFeatureHover} />)
        })}
      {this.props.isReadyToInsertLayers && <MapboxGlComponentCamera
        camera={this.props.camera}
        map={this.map}
        mapbox={this.props.mapbox} /> }
    </div>)
  }
})
export default MapboxGlComponent
