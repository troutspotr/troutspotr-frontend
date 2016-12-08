import React, { PropTypes } from 'react'
import classes from './Map.scss'
import MapboxGlContainer from './MapboxGlMap/MapboxGl.container'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
import LoadingComponent from 'ui/core/loading/Loading.component'
import { browserHistory } from 'react-router'
// import MessageOverlay from 'ui/core/messageOverlay/MessageOverlay.component'
// import RestrictionComponent from 'ui/core/regulations/Restriction.component'
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
    specialRegulationsCurrentSeason: PropTypes.array.isRequired,
    selectedRoad: PropTypes.object,
    streamDictionary: PropTypes.object.isRequired
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

  // renderRegionViewLegendOverlay () {
  //   let { selectedGeometry, selectedRoad } = this.props
  //   let isRegionView = isEmpty(selectedGeometry) && isEmpty(selectedRoad)
  //   if (isRegionView === false) {
  //     return null
  //   }

  //   return (
  //     <MessageOverlay position='top'>
  //       <div>region view</div>
  //     </MessageOverlay>)
  // },

  // renderAccessPointOverlay () {
  //   let { selectedGeometry, selectedRoad } = this.props
  //   let isAccessPointView = isEmpty(selectedGeometry) === false && isEmpty(selectedRoad) === false
  //   if (isAccessPointView === false) {
  //     return null
  //   }

  //   return (
  //     <MessageOverlay position='top'>
  //       <div>access point view</div>
  //     </MessageOverlay>)
  // },

  // renderStreamDetailsOverlay () {
  //   let { selectedGeometry, selectedRoad } = this.props
  //   let isStreamDetailsView = isEmpty(selectedGeometry) === false && isEmpty(selectedRoad)
  //   if (isStreamDetailsView === false) {
  //     return null
  //   }

  //   let number = selectedGeometry.accessPoints
  //     .filter(x => x.properties.is_over_trout_stream && x.properties.is_over_publicly_accessible_land)
  //     .length

  //   return (
  //     <MessageOverlay position='top'>
  //       <PublicBridgesComponent
  //         number={number} />
  //     </MessageOverlay>)
  // },

  // renderSpecialRegulationsOverlay () {
  //   let { selectedGeometry, specialRegulationsCurrentSeason } = this.props
  //   if (isEmpty(selectedGeometry) || specialRegulationsCurrentSeason.length === 0) {
  //     return null
  //   }
  //   let specialRegulationsElement = (<div>
  //     <div className={classes.specialRegulationsTitle}>Special Regulations</div>
  //     {
  //       specialRegulationsCurrentSeason.map((reg, index) => {
  //         return (<RestrictionComponent
  //           key={index}
  //           color={reg.isFishSanctuary ? 'red' : reg.isOpenerOverride ? 'blue' : 'yellow'}
  //           pattern={reg.isFishSanctuary ? 'solid' : 'stipple'}
  //           text={reg.legalText}
  //           length={reg.roundedLength + ' mi'} />)
  //       })
  //     }
  //   </div>)

  //   return (
  //     <MessageOverlay position='bottom'>
  //       {specialRegulationsElement}
  //     </MessageOverlay>)
  // },

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedGeometry !== this.props.selectedGeometry) {
      if (nextProps.selectedGeometry != null) {
        this.props.selectMapFeature({
          type: 'FeatureCollection',
          features: nextProps.selectedGeometry.sections
        })
      }
    } else if (nextProps.selectedRoad !== this.props.selectedRoad && isEmpty(nextProps.selectedRoad) === false) {
      this.props.selectFoculPoint(nextProps.selectedRoad)
    } else if (nextProps.selectedRoad == null && this.props.selectedRoad != null) {
      this.props.selectMapFeature({
        type: 'FeatureCollection',
        features: nextProps.selectedGeometry.sections
      })
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

    return (<LoadingComponent subTitle={'Loading Map'} />)
  },

  onFeatureClick (features) {
    if (isEmpty(features)) {
      return
    }
    let { selectedGeometry, selectedState, selectedRegion, streamDictionary, selectedRoad } = this.props
    let hasSelectedGeometry = isEmpty(selectedGeometry) === false
    let stream = find(features, x => has(x.properties, 'water_id'))
    let accessPoint = find(features, x => has(x.properties, 'alphabetLetter'))

    if (stream == null && accessPoint == null) {
      return
    }

    let selectionPreference = 'preferPoint'

    if (selectionPreference === 'preferPoint' && isEmpty(accessPoint) === false) {
      console.log('it appears you clicked on or near an access point but not a strema', accessPoint)
      if (hasSelectedGeometry) {
        let soughtRoad = find(selectedGeometry.accessPoints, ap => ap.properties.slug === accessPoint.properties.slug)
        let isSelectedRoadOnSelectedGeometry = isEmpty(soughtRoad) === false
        if (isSelectedRoadOnSelectedGeometry) {
          let roadSlug = soughtRoad.properties.slug
          let streamSlug = selectedGeometry.stream.properties.slug
          console.log('i believe you selected a road and you want to zoom in on it.', soughtRoad)
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
      } else {
        // they clicked on an access point but not a stream.
        // let's assume they clicked on the access point's stream.
        let streamId = accessPoint.properties.stream_gid
        let streamSlug = streamDictionary[streamId].stream.properties.slug
        browserHistory.push(`/${selectedState}/${selectedRegion}/${streamSlug}`)
      }
    } else if (isEmpty(stream) === false) {
      // they clicked on a stream and not an access point.
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
    }

    // console.log('click happen!', feature)
  },

  onFeatureHover (feature) {
    // console.log('hover happen!', feature)
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
