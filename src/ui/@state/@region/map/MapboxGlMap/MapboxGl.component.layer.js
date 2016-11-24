import React, { PropTypes } from 'react'
import { debounce } from 'lodash'

const MapboxGlLayerComponent = React.createClass({
  propTypes: {
    // sourceData: PropTypes.object.isRequired,
    // sourceId: PropTypes.string.isRequired,
    layers: PropTypes.array.isRequired,
    filters: PropTypes.array.isRequired,
    map: PropTypes.object.isRequired,
    onFeatureClick: PropTypes.func,
    onFeatureHover: PropTypes.func
  },

  componentDidMount () {
    // load the layers.
    this.addLayers(this.props.map, this.props.layers)

    // load our filters
    this.addFilters(this.props.map, this.props.filters)
    // load interactivity.
    const DEBOUNCE_DELAY_MS = 80
    let debounceOptions = { maxWait: 20 }

    // We should debounce our events to reduce load on CPU.
    this.proxyOnLayerMouseOver = debounce(this.onLayerMouseOver, DEBOUNCE_DELAY_MS, debounceOptions)
    this.proxyOnUpdateLayerFilter = debounce(this.updateLayerFilter, 20, { maxWait: 20 })
    this.proxyOnClick = debounce(this.onLayerClick, 20, { maxWait: 20 })
    // need to delete this line and move it up.
    this.props.layers
      .filter(layer => layer.layerDefinition.interactive)
      .forEach(layer => {
        // this line eventually just calls onLayerMouseOver
        // but without a ton of needless canvas queries.
        // The idea is better performance.
        this.props.map.on('mousemove', this.proxyOnLayerMouseOver)
        this.props.map.on('click', this.proxyOnClick)
      })
  },

  onLayerMouseOver (e) {
    let features = this.getInteractiveFeaturesOverPoint(e.point)
    this.props.map.getCanvas().style.cursor = features.length ? 'pointer' : ''
    if (this.props.onFeatureHover != null) {
      if (features == null || features.length === 0) {
        return
      }

      this.props.onFeatureHover(features[0])
    }
  },

  getInteractiveFeaturesOverPoint (point) {
    let BOX_DIMENSION = 30
    let boundingBox = [
      [point.x - BOX_DIMENSION / 2, point.y - BOX_DIMENSION / 2],
      [point.x + BOX_DIMENSION / 2, point.y + BOX_DIMENSION / 2]
    ]

    let interactiveLayerNames = this.props.layers
      .filter(layer => layer.layerDefinition.interactive)
      .map(layer => layer.layerDefinition.id)

    var features = this.props.map.queryRenderedFeatures(boundingBox, { layers: interactiveLayerNames })
    return features
  },

  componentWillUpdate (nextProps) {
    let isDuplicate = nextProps === this.props
    if (isDuplicate) {
      return
    }

    let { layers, filters } = this.props
    // let isSourceUnchanged = nextProps.sourceData === sourceData
    // if (isSourceUnchanged === false) {
    //   this.props.map.getSource(this.props.sourceId)
    //     .setData(this.props.sourceData)
    // }

    let isLayersUnchanged = layers === nextProps.layers
    if (isLayersUnchanged === false) {
      layers.forEach(layer => {
        this.proxyOnUpdateLayerFilter(layer)
      })
    }

    let isFiltersUnchanged = filters === nextProps.filters
    if (isFiltersUnchanged === false) {
      this.addFilters(this.props.map, nextProps.filters)
    }
  },

  updateLayerFilter (layer) {
    if (layer.layerDefinition.filter == null) {
      return
    }

    this.props.map.setFilter(layer.layerDefinition.id, layer.layerDefinition.filter)
  },

  onLayerClick (e) {
    let features = this.getInteractiveFeaturesOverPoint(e.point)
    if (features == null || features.length === 0) {
      return
    }
    
    this.props.onFeatureClick(features[0])
  },

  addFilters (map, filters) {
    filters.forEach(filter => {
      // check to see if we already have it.
      map.setFilter(filter.layerId, filter.filterDefinition)
    })
  },

  addLayers (map, layers) {
    layers.forEach(layer => {
      map.addLayer(layer.layerDefinition, layer.insertBefore)
      // map.addLayer(layer.layerDefinition)
    })
  },

  componentWillUnmount () {
    // this.layers.forEach(layer => {
    //   this.map.removeLayer(layer.layerDefinition.id)
    // })
  },

  render () {
    return null
  }
})

export default MapboxGlLayerComponent
