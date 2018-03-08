// import RegulationsOverlayContainer from './overlays/RegulationsOverlay.container'
// import DetailsOverlay from './overlays/DetailsOverlay.container'
import find from 'lodash-es/find'
import has from 'lodash-es/has'
import isEmpty from 'lodash-es/isEmpty'
import * as React from 'react'
// const classes = require('./Map.scss')
// import MapboxGlContainer from './MapboxGlMap/MapboxGl.container'
// import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
// import LoadingComponent from 'ui/core/loading/Loading.component'
import { browserHistory } from 'react-router'
// const MAP_ID = 'primary_map_id'
export class MapComponent extends React.Component<{}> {
  public componentWillUnmount() {
    if (this.state == null) {
      return
    }
  }

  protected performZoomOnFeature(nextProps) {
    if (isEmpty(nextProps.selectedGeometry)) {
      return
    }

    const isNewStreamSelection = nextProps.selectedGeometry !== this.props.selectedGeometry
    const isSelectedNewRoad =
      nextProps.selectedRoad !== this.props.selectedRoad &&
      isEmpty(nextProps.selectedRoad) === false
    if (isNewStreamSelection) {
      if (isSelectedNewRoad) {
        this.props.selectFoculPoint(nextProps.selectedRoad)
        return
      }
      if (nextProps.selectedGeometry != null) {
        this.props.selectMapFeature({
          type: 'FeatureCollection',
          features: nextProps.selectedGeometry.sections,
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
        features: nextProps.selectedGeometry.sections,
      })
    }
  }

  public componentWillReceiveProps(nextProps) {
    // try {
    //   this.performZoomOnFeature(nextProps)
    // } catch (e) {
    //   console.log(e) // eslint-disable-line
    // }
    // const previousModuleLoadStatus = this.props.mapboxModuleStatus
    // const currentlyVisible = nextProps.isVisible
    // const isVisibleAndNeedsLoad =
    //   currentlyVisible && previousModuleLoadStatus === LOADING_CONSTANTS.IS_NOT_STARTED
    // if (isVisibleAndNeedsLoad) {
    //   this.props.loadMapModuleAsync()
    // }
  }

  // renderMap() {
  //   return (
  //     <div>
  //       <MapboxGlContainer
  //         mapbox={this.props.mapboxModule}
  //         setIsMapInitialized={this.props.setIsMapInitialized}
  //         camera={this.props.camera}
  //         ground={this.props.ground}
  //         settings={this.props.settings}
  //         interactivity={this.props.interactivity}
  //         onFeatureClick={this.onFeatureClick}
  //         onFeatureHover={this.onFeatureHover}
  //         isReadyToInsertLayers={this.props.isReadyToInsertLayers}
  //         elementId={MAP_ID}
  //         isVisible={this.props.isVisible}
  //         selectedGeometry={this.props.selectedGeometry}
  //       />
  //       {this.renderDetailsOverlay()}
  //       {this.renderRegulationsOverlay()}
  //     </div>
  //   )
  // }

  public renderLoading() {
    // if (this.props.isVisible === false) {
    //   return null
    // }
    // if (this.props.isRegionFinishedLoading === false) {
    //   return null
    // }
    // return <LoadingComponent subTitle={'Loading Map'} />
  }

  public userSelectedStreamAndAccessPoint(streams, accessPoints) {
    const { selectedState, selectedRegion, streamDictionary, selectedRoad } = this.props
    if (accessPoints.length > 1 && streams.length > 1) {
      // too many candidates. Bail!
      return
    }

    if (accessPoints.length > 1) {
      // select the stream instead.
      this.userSelectedStream(streams[0])
    }

    const accessPoint = accessPoints[0]
    const roadSlug = accessPoint.properties.slug
    const streamId = accessPoint.properties.stream_gid
    const streamSlug = streamDictionary[streamId].stream.properties.slug
    const isAccessPointAlreadySelected =
      selectedRoad != null && selectedRoad.properties.slug === roadSlug

    // Assume the user selected a new stream.
    this.props.selectFoculPoint(accessPoint)
    if (isAccessPointAlreadySelected === false) {
      browserHistory.push(`/${selectedState}/${selectedRegion}/${streamSlug}#${roadSlug}`)
    }
  }

  public userSelectedStream(stream) {
    const { selectedGeometry, selectedState, selectedRegion } = this.props
    const hasSelectedGeometry = isEmpty(selectedGeometry) === false
    const slug = stream.properties.slug
    const isAlreadySelected =
      hasSelectedGeometry && selectedGeometry.stream.properties.gid === stream.properties.gid
    if (isAlreadySelected) {
      // Zoom in anyways - they selected the stream. jsut recenter, would ya?
      this.props.selectMapFeature({
        type: 'FeatureCollection',
        features: selectedGeometry.sections,
      })
    }
    browserHistory.push(`/${selectedState}/${selectedRegion}/${slug}`)
  }

  public userSelectedAccessPoint = accessPoint => {
    const {
      selectedGeometry,
      selectedState,
      selectedRegion,
      streamDictionary,
      selectedRoad,
    } = this.props
    const hasSelectedGeometry = isEmpty(selectedGeometry) === false
    const streamId = accessPoint.properties.stream_gid
    const streamSlug = streamDictionary[streamId].stream.properties.slug
    const roadSlug = accessPoint.properties.slug

    if (hasSelectedGeometry) {
      const soughtRoad = find(
        selectedGeometry.accessPoints,
        ap => ap.properties.slug === accessPoint.properties.slug
      )
      const isSelectedRoadOnSelectedGeometry = isEmpty(soughtRoad) === false
      if (isSelectedRoadOnSelectedGeometry) {
        // Check to see that it's already selected.
        const isAlreadySelected = selectedRoad != null && selectedRoad.properties.slug === roadSlug
        if (isAlreadySelected) {
          // Zoom in anyways - they selected the stream. jsut recenter, would ya?
          this.props.selectFoculPoint(selectedRoad)
        }
        browserHistory.push(`/${selectedState}/${selectedRegion}/${streamSlug}#${roadSlug}`)
      } else {
        console.log(
          'i believe the road was different than the stream - do you want to jump anyways?'
        ) // eslint-disable-line
      }

      return
    }

    // They clicked on an access point but not a stream.
    // Let's just zoom in on what they selected.
    browserHistory.push(`/${selectedState}/${selectedRegion}/${streamSlug}#${roadSlug}`)
  }

  public onFeatureClick = features => {
    if (isEmpty(features)) {
      return
    }

    const featureDictionary = features.reduce(
      (dictionary, item) => {
        if (has(item.properties, 'water_id')) {
          dictionary.streams.push(item)
        }

        if (has(item.properties, 'alphabetLetter')) {
          dictionary.accessPoints.push(item)
        }

        return dictionary
      },
      { streams: [], accessPoints: [] }
    )
    const { streams, accessPoints } = featureDictionary

    if (isEmpty(streams) && isEmpty(accessPoints)) {
      return
    }

    if (isEmpty(streams) && isEmpty(accessPoints) === false) {
      this.userSelectedAccessPoint(accessPoints[0])
      return
    }

    if (isEmpty(streams) === false && isEmpty(accessPoints) === false) {
      this.userSelectedStreamAndAccessPoint(streams, accessPoints)
    } else if (isEmpty(streams) === false) {
      this.userSelectedStream(streams[0])
    }
  }

  public onFeatureHover = feature => {}

  public render() {
    return <div>Not yet implemented</div>
    //   const isMapLoaded = this.props.mapboxModuleStatus === LOADING_CONSTANTS.IS_SUCCESS
    //   const { isReadyToInsertLayers } = this.props
    //   return (
    //     <div className={this.props.isVisible ? classes.mapContainer : classes.invisible}>
    //       {isMapLoaded && this.renderMap()}
    //       {isReadyToInsertLayers === false && this.renderLoading()}
    //     </div>
    //   )
    // }
  }
}

// MapComponent.propTypes = {
//   mapboxModule: PropTypes.object,
//   mapboxModuleStatus: PropTypes.string.isRequired,
//   isVisible: PropTypes.bool.isRequired,
//   isReadyToInsertLayers: PropTypes.bool.isRequired,
//   camera: PropTypes.object.isRequired,
//   ground: PropTypes.object.isRequired,
//   settings: PropTypes.object.isRequired,
//   interactivity: PropTypes.object.isRequired,
//   selectedState: PropTypes.string.isRequired,
//   selectedRegion: PropTypes.string.isRequired,
//   selectedGeometry: PropTypes.object,
//   loadMapModuleAsync: PropTypes.func.isRequired,
//   setIsMapInitialized: PropTypes.func.isRequired,
//   selectMapFeature: PropTypes.func.isRequired,
//   selectFoculPoint: PropTypes.func.isRequired,
//   selectedRoad: PropTypes.object,
//   streamDictionary: PropTypes.object.isRequired,
//   isRegionFinishedLoading: PropTypes.bool.isRequired,
// }
