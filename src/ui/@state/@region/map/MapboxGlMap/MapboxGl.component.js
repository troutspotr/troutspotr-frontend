import React, { PropTypes } from 'react'
// import { Link } from 'react-router'
import classes from '../Map.scss'
import MapboxGlLayerComponent from './MapboxGl.component.layer'
const MapboxGlComponent = React.createClass({
  propTypes: {
    mapbox: PropTypes.object.isRequired,
    elementId: PropTypes.string.isRequired,
    camera: PropTypes.object.isRequired,
    ground: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    interactivity: PropTypes.object.isRequired,
    onMapLoadCallback: PropTypes.func.isRequired,
    isReadyToInsertLayers: PropTypes.bool.isRequired,
    sources: PropTypes.array.isRequired,
    // layers: PropTypes.array.isRequired,
    // filters: PropTypes.array.isRequired,
    layerPackage: PropTypes.array.isRequired,

    onFeatureClick: PropTypes.func.isRequires,
    onFeatureHover: PropTypes.func.isRequires
  },

  onClick () {

  },

  componentDidMount () {
    console.log('MAP MOUNTED')
    this.map = new this.props.mapbox.Map({
      container: this.props.elementId,
      style: 'mapbox://styles/andest01/civrfvrrh004h2jpb8ag0wsjf',
      center: [-93.50, 42],
      zoom: 4
    })

    this.map.dragRotate.disable()
    this.map.touchZoomRotate.disableRotation()
    this.props.onMapLoadCallback(false)
    this.map.once('load', this.onMapLoad)
    this.map.once('data', this.onDataLoad)
    this.map.on('layer.add', e => { console.log(e) })
  },

  componentWillReceiveProps (nextProps) {
    let { isReadyToInsertLayers } = nextProps
    console.log(isReadyToInsertLayers)

    // did our geoJson change?
    if (isReadyToInsertLayers === false) {
      console.log('props changed but not ready')
      return
    }
    let { sources } = this.props
    console.log('props changed...')
    let isSourceChanged = sources !== nextProps.sources
    if (isSourceChanged) {
      this.safelySetSources(this.map, nextProps.sources)
    } else {
      console.log('but source didnt get set')
    }
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
    this.props.onMapLoadCallback(true)
  },

  componentWillUnMount () {
    if (this.map) {
      this.map.remove()
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
    </div>)
  }
})
export default MapboxGlComponent
