import React, { PropTypes, Component } from 'react'
import MapboxGlLayerComponent from './MapboxGl.component.layer'
import { GpsLayers } from './styles/Gps.style'
import { GPS_LOCATION_SOURCE_ID } from './sources/Source.selectors'
import shallowCompare from 'shallow-compare'
const EMPTY_FILTERS = []

class MapboxGlGpsLayer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSourceLoaded: false
    }
  }

  componentWillMount () {
    // add our source
    // this.updateSource(this.props.map, this.props.source)
    let jsonSource = {
      type: 'geojson',
      data: this.props.source
    }

    this.props.map.addSource(GPS_LOCATION_SOURCE_ID, jsonSource)
    this.setState({ isSourceLoaded: true })
  }

  componentWillUpdate (nextProps, nextState) {
    let shouldUpdate = shallowCompare(this, nextProps, nextState)
    if (shouldUpdate === false) {
      return
    }

    this.updateSource(nextProps.map, nextProps.source)
  }

  componentWillUnmount () {
    let mapSource = this.props.map.getSource(GPS_LOCATION_SOURCE_ID)
    if (mapSource != null) {
      this.props.map.removeSource(GPS_LOCATION_SOURCE_ID)
    }
  }

  updateSource (map, source) {
    let mapSource = map.getSource(GPS_LOCATION_SOURCE_ID)
    mapSource.setData(source)
  }

  render () {
    if (this.state.isSourceLoaded === false) {
      return null
    }

    return (<MapboxGlLayerComponent
      layers={GpsLayers}
      filters={EMPTY_FILTERS}
      map={this.props.map}
            />)
  }
}

MapboxGlGpsLayer.propTypes = {
  source: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired
}

export default MapboxGlGpsLayer
