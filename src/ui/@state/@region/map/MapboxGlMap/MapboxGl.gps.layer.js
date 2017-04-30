import React, { PropTypes, Component } from 'react'
import { debounce } from 'lodash'
import MapboxGlLayerComponent from './MapboxGl.component.layer'
import { GpsLayers } from './styles/Gps.style'
import { GPS_LOCATION_SOURCE_ID } from './sources/Source.selectors'
const EMPTY_FILTERS = []

class MapboxGlGpsLayer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSourceLoaded: false
    }
  }
  componentDidMount () {
  	// add our source
  	this.updateSource(this.props.map, this.props.source)
  	this.setState({ isSourceLoaded: true })
  }

  componentWillUpdate (nextProps) {
  	if (this.props === nextProps) {
  		return
  	}

  	this.updateSource(nextProps.map, nextProps.source)
  }

  componentWillUnmount () {
  }

  updateSource (map, source) {
    let jsonSource = {
      type: 'geojson',
      data: source
    }
    let mapSource = map.getSource(GPS_LOCATION_SOURCE_ID)
    if (mapSource == null) {
      map.addSource(GPS_LOCATION_SOURCE_ID, jsonSource)
    } else {
      mapSource.setData(source)
    }
  }

  render () {
  	if (this.state.isSourceLoaded === false) {
  		return null
  	}

    return (<MapboxGlLayerComponent
      layers={GpsLayers}
      filters={EMPTY_FILTERS}
      map={this.props.map}
            />
    	)
  }
}

MapboxGlGpsLayer.propTypes = {
  source: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired
}

export default MapboxGlGpsLayer
