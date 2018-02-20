import * as React from 'react'
import debounce from 'lodash-es/debounce'

class MapboxGlLayerComponent extends React.PureComponent<any> {
  protected proxyOnUpdateLayerFilter
  componentDidMount() {
    // Load the layers.
    this.addLayers(this.props.map, this.props.layers)

    // Load our filters
    this.addFilters(this.props.map, this.props.filters)
    // Load interactivity.
    // We should debounce our events to reduce load on CPU.
    this.proxyOnUpdateLayerFilter = debounce(this.updateLayerFilter, 20, { maxWait: 20 })
  }

  componentWillReceiveProps(nextProps) {
    const isDuplicate = nextProps === this.props
    if (isDuplicate) {
      return
    }

    const { layers, filters } = this.props
    const isLayersUnchanged = layers === nextProps.layers
    if (isLayersUnchanged === false) {
      layers.forEach(layer => {
        this.proxyOnUpdateLayerFilter(layer)
      })
    }

    const isFiltersUnchanged = filters === nextProps.filters
    if (isFiltersUnchanged === false) {
      this.addFilters(this.props.map, nextProps.filters)
    }
  }

  updateLayerFilter(layer) {
    if (layer.layerDefinition.filter == null) {
      return
    }

    this.props.map.setFilter(layer.layerDefinition.id, layer.layerDefinition.filter)
  }

  addFilters(map, filters) {
    filters.forEach(filter => {
      // Check to see if we already have it.
      map.setFilter(filter.layerId, filter.filterDefinition)
    })
  }

  addLayers(map, layers) {
    layers.forEach(layer => {
      map.addLayer(layer.layerDefinition, layer.insertBefore)
    })
  }

  removeLayers(map, layers) {
    layers.forEach(layer => {
      try {
        map.removeLayer(layer.layerDefinition.id)
      } catch (error) {
        // if (__DEV__ === false) {
        //   console.error(`There was an error removing the layer ${layer.id}`) // eslint-disable-line
        // }
      }
    })
  }

  componentWillUnmount() {
    this.removeLayers(this.props.map, this.props.layers)
  }

  render() {
    return null
  }
}

// MapboxGlLayerComponent.propTypes = {
//   layers: PropTypes.array.isRequired,
//   filters: PropTypes.array.isRequired,
//   map: PropTypes.object.isRequired,
// }

export default MapboxGlLayerComponent
