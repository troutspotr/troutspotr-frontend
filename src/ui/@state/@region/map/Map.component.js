import React, { PropTypes } from 'react'
import classes from './Map.scss'
import MapboxGlContainer from './MapboxGlMap/MapboxGl.container'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
import LoadingComponent from 'ui/core/loading/Loading.component'
import { browserHistory } from 'react-router'
import RegulationsOverlayContainer from './overlays/RegulationsOverlay.container'
import DetailsOverlay from './overlays/DetailsOverlay.container'
import { isEmpty, find, has } from 'lodash'
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
    selectedState: React.PropTypes.string.isRequired,
    selectedRegion: React.PropTypes.string.isRequired,
    selectedGeometry: React.PropTypes.object,
    loadMapModuleAsync: PropTypes.func.isRequired,
    setIsMapInitialized: PropTypes.func.isRequired,
    selectMapFeature: PropTypes.func.isRequired,
    selectFoculPoint: PropTypes.func.isRequired,
    selectedRoad: PropTypes.object,
    streamDictionary: PropTypes.object.isRequired,
    isRegionFinishedLoading: PropTypes.bool.isRequired
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

  renderDetailsOverlay () {
    return <DetailsOverlay />
  },

  renderRegulationsOverlay () {
    return <RegulationsOverlayContainer />
  },

  performZoomOnFeature (nextProps) {
    if (isEmpty(nextProps.selectedGeometry)) {
      return
    }

    let isNewStreamSelection = nextProps.selectedGeometry !== this.props.selectedGeometry
    let isSelectedNewRoad = nextProps.selectedRoad !== this.props.selectedRoad && isEmpty(nextProps.selectedRoad) === false
    if (isNewStreamSelection) {
      if (isSelectedNewRoad) {
        this.props.selectFoculPoint(nextProps.selectedRoad)
        return
      }
      if (nextProps.selectedGeometry != null) {
        this.props.selectMapFeature({
          type: 'FeatureCollection',
          features: nextProps.selectedGeometry.sections
        })
        return
      }
    }

    if (isSelectedNewRoad) {
      this.props.selectFoculPoint(nextProps.selectedRoad)
      return
    }

    if (nextProps.selectedRoad == null && this.props.selectedRoad != null) {
      this.props.selectMapFeature({
        type: 'FeatureCollection',
        features: nextProps.selectedGeometry.sections
      })
    }
  },

  componentWillReceiveProps (nextProps) {
    try {
      this.performZoomOnFeature(nextProps)
    } catch (e) {
      console.log(e)
    }

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
    return (<div>
      <MapboxGlContainer
        mapbox={this.props.mapboxModule}
        setIsMapInitialized={this.props.setIsMapInitialized}
        camera={this.props.camera}
        ground={this.props.ground}
        settings={this.props.settings}
        interactivity={this.props.interactivity}
        onFeatureClick={this.onFeatureClick}
        onFeatureHover={this.onFeatureHover}
        isReadyToInsertLayers={this.props.isReadyToInsertLayers}
        elementId={MAP_ID}
        isVisible={this.props.isVisible}
        selectedGeometry={this.props.selectedGeometry} />
      {this.renderDetailsOverlay()}
      {this.renderRegulationsOverlay()}
    </div>)
  },

  renderLoading () {
    if (this.props.isVisible === false) {
      return null
    }

    if (this.props.isRegionFinishedLoading === false) {
      return null
    }

    return (<LoadingComponent subTitle={'Loading Map'} />)
  },

  userSelectedStreamAndAccessPoint (stream, accessPoint) {
    let { selectedGeometry, selectedState, selectedRegion, streamDictionary, selectedRoad } = this.props
    let hasSelectedGeometry = isEmpty(selectedGeometry) === false
    let roadSlug = accessPoint.properties.slug
    let streamId = accessPoint.properties.stream_gid
    let streamSlug = streamDictionary[streamId].stream.properties.slug
    let isSelectedStreamAlreadySelected = hasSelectedGeometry && selectedGeometry.stream.properties.gid === stream.properties.gid
    let isAccessPointAlreadySelected = selectedRoad != null && selectedRoad.properties.slug === roadSlug
    if (isSelectedStreamAlreadySelected) {
      if (isAccessPointAlreadySelected) {
        // just zoom in on the road.
        this.props.selectFoculPoint(selectedRoad)
      }
      browserHistory.push(`/${selectedState}/${selectedRegion}/${streamSlug}#${roadSlug}`)
      return
    }

    // assume the user selected a new stream.
    browserHistory.push(`/${selectedState}/${selectedRegion}/${streamSlug}`)
  },

  userSelectedStream (stream) {
    let { selectedGeometry, selectedState, selectedRegion } = this.props
    let hasSelectedGeometry = isEmpty(selectedGeometry) === false
    let slug = stream.properties.slug
    let isAlreadySelected = hasSelectedGeometry && selectedGeometry.stream.properties.gid === stream.properties.gid
    if (isAlreadySelected) {
      // zoom in anyways - they selected the stream. jsut recenter, would ya?
      this.props.selectMapFeature({
        type: 'FeatureCollection',
        features: selectedGeometry.sections
      })
    }
    browserHistory.push(`/${selectedState}/${selectedRegion}/${slug}`)
  },

  userSelectedAccessPoint (accessPoint) {
    let { selectedGeometry, selectedState, selectedRegion, streamDictionary, selectedRoad } = this.props
    let hasSelectedGeometry = isEmpty(selectedGeometry) === false
    let streamId = accessPoint.properties.stream_gid
    let streamSlug = streamDictionary[streamId].stream.properties.slug
    let roadSlug = accessPoint.properties.slug

    if (hasSelectedGeometry) {
      let soughtRoad = find(selectedGeometry.accessPoints, ap => ap.properties.slug === accessPoint.properties.slug)
      let isSelectedRoadOnSelectedGeometry = isEmpty(soughtRoad) === false
      if (isSelectedRoadOnSelectedGeometry) {
        // check to see that it's already selected.
        let isAlreadySelected = selectedRoad != null && selectedRoad.properties.slug === roadSlug
        if (isAlreadySelected) {
          // zoom in anyways - they selected the stream. jsut recenter, would ya?
          this.props.selectFoculPoint(selectedRoad)
        }
        browserHistory.push(`/${selectedState}/${selectedRegion}/${streamSlug}#${roadSlug}`)
      } else {
        console.log('i believe the road was different than the stream - do you want to jump anyways?')
      }

      return
    }

    // they clicked on an access point but not a stream.
    // let's just zoom in on what they selected.
    browserHistory.push(`/${selectedState}/${selectedRegion}/${streamSlug}#${roadSlug}`)
  },

  onFeatureClick (features) {
    if (isEmpty(features)) {
      return
    }

    let stream = find(features, x => has(x.properties, 'water_id'))
    let accessPoint = find(features, x => has(x.properties, 'alphabetLetter'))

    if (isEmpty(stream) && isEmpty(accessPoint)) {
      return
    }

    if (isEmpty(stream) && isEmpty(accessPoint) === false) {
      this.userSelectedAccessPoint(accessPoint)
      return
    }

    if (isEmpty(stream) === false && isEmpty(accessPoint) === false) {
      this.userSelectedStreamAndAccessPoint(stream, accessPoint)
    } else if (isEmpty(stream) === false) {
      this.userSelectedStream(stream)
    }
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
