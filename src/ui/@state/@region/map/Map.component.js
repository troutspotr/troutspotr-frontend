import React, { PropTypes } from 'react'
import classes from './Map.scss'
import MapboxGlContainer from './MapboxGlMap/MapboxGl.container'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
import LoadingComponent from 'ui/core/loading/Loading.component'
const MAP_ID = 'primary_map_id'
const MapComponent = React.createClass({
  propTypes: {
    mapboxModule: PropTypes.object,
    mapboxModuleStatus: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
    isReadyToInsertLayers: PropTypes.bool.isRequired,
    camera: PropTypes.object.isRequired,
    ground: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    interactivity: PropTypes.object.isRequired,
    loadMapModuleAsync: PropTypes.func.isRequired,
    setIsMapInitialized: PropTypes.func.isRequired
  },

  componentDidMount () {
  },

  componentWillUnmount () {
    if (this.state == null) {
      return
    }

    if (this.state.mapboxGl) {
      this.state.mapboxGl = null
    }
  },

  componentWillReceiveProps (nextProps) {
    let previousModuleLoadStatus = this.props.mapboxModuleStatus
    let currentlyVisible = nextProps.isVisible

    let isVisibleAndNeedsLoad = currentlyVisible &&
      previousModuleLoadStatus === LOADING_CONSTANTS.IS_NOT_STARTED

    if (isVisibleAndNeedsLoad) {
      this.props.loadMapModuleAsync()
      return
    }
  },

  renderMap () {
    return (<MapboxGlContainer
      mapbox={this.props.mapboxModule}
      onMapLoadCallback={this.props.setIsMapInitialized}
      camera={this.props.camera}
      ground={this.props.ground}
      settings={this.props.settings}
      interactivity={this.props.interactivity}
      onFeatureClick={this.onFeatureClick}
      onFeatureHover={this.onFeatureHover}
      isReadyToInsertLayers={this.props.isReadyToInsertLayers}
      elementId={MAP_ID} />)
  },

  renderLoading () {
    if (this.props.isVisible === false) {
      return null
    }

    return (<LoadingComponent subTitle={'Loading Map'} />)
  },

  onFeatureClick (feature) {
    // this.props.selectState(feature.properties);
  },

  onFeatureHover (feature) {

  },

  render () {
    let isMapLoaded = this.props.mapboxModuleStatus === LOADING_CONSTANTS.IS_SUCCESS
    let { isReadyToInsertLayers } = this.props
    return (<div className={this.props.isVisible ? classes.mapContainer : classes.invisible}>
      {isMapLoaded && this.renderMap()}
      {isReadyToInsertLayers === false && this.renderLoading()}
    </div>)
  }
})

export default MapComponent
