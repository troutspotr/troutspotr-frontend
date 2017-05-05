import { PropTypes, Component } from 'react'
import { debounce } from 'lodash'
import shallowCompare from 'shallow-compare'

class MapboxGlLayerComponent extends Component {
  componentDidMount () {
    // load the layers.
    this.addLayers(this.props.map, this.props.layers)

    // load our filters
    this.addFilters(this.props.map, this.props.filters)
    // load interactivity.
    // We should debounce our events to reduce load on CPU.
    this.proxyOnUpdateLayerFilter = debounce(this.updateLayerFilter, 20, { maxWait: 20 })
  }

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  componentWillReceiveProps (nextProps) {
    let isDuplicate = nextProps === this.props
    if (isDuplicate) {
      return
    }

    let { layers, filters } = this.props
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
  }

  updateLayerFilter (layer) {
    if (layer.layerDefinition.filter == null) {
      return
    }

    this.props.map.setFilter(layer.layerDefinition.id, layer.layerDefinition.filter)
  }

  onLayerClick (e) {
    let features = this.getInteractiveFeaturesOverPoint(e.point)
    if (features == null || features.length === 0) {
      return
    }
  }

  addFilters (map, filters) {
    filters.forEach(filter => {
      // check to see if we already have it.
      map.setFilter(filter.layerId, filter.filterDefinition)
    })
  }

  addLayers (map, layers) {
    layers.forEach(layer => {
      map.addLayer(layer.layerDefinition, layer.insertBefore)
    })
  }

  removeLayers (map, layers) {
    layers.forEach(layer => {
      map.removeLayer(layer.layerDefinition.id)
    })
  }

  componentWillUnmount () {
    this.removeLayers(this.props.map, this.props.layers)
  }

  render () {
    return null
  }
}

MapboxGlLayerComponent.propTypes = {
  layers: PropTypes.array.isRequired,
  filters: PropTypes.array.isRequired,
  map: PropTypes.object.isRequired
}

export default MapboxGlLayerComponent
