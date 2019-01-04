import * as React from 'react'
import { MapboxGlContainer } from './MapboxGlMap/MapboxGl.container'
import { MapboxGlCameraContainer } from './MapboxGlMap/MapboxGl.camera.container'
import { ACCESSPOINT_CIRCLE_LABEL_LAYER, ACCESSPOINT_ROAD_LABEL_LAYER, ACCESSPOINT_CIRCLE_BORDER_LAYER, ACCESSPOINT_CIRCLE_LAYER } from './MapboxGlMap/styles/AccessPoints.layers'
import { STREAM_LAYER_ID } from './MapboxGlMap/styles/Stream.layers'
import { AllGeoJSON } from '@turf/helpers'
import { MapboxGlCameraDirectorContainer } from './MapboxGlMap/MapboxGl.camera.director.container'
import { STREAM_CENTROID_LABEL_SM, STREAM_CENTROID_LABEL_LG } from './MapboxGlMap/styles/MapLabels.layers'
const classes = require('./Map.scss')

const STREAM = 'stream'
const ACCESS_POINT = 'accessPoint'

export const LAYERS_IN_ORDER_OF_PRIORITY = {
  [ACCESSPOINT_ROAD_LABEL_LAYER]: ACCESS_POINT,
  [ACCESSPOINT_CIRCLE_LABEL_LAYER]: ACCESS_POINT,
  [ACCESSPOINT_CIRCLE_BORDER_LAYER]: ACCESS_POINT,
  [ACCESSPOINT_CIRCLE_LAYER]: ACCESS_POINT,
  [STREAM_CENTROID_LABEL_SM]: STREAM,
  [STREAM_CENTROID_LABEL_LG]: STREAM,
  [STREAM_LAYER_ID]: STREAM,
}


export const findMostImportantFeatureThatWasClicked = (featureLookupTable: {[key:string]: AllGeoJSON[] }) => {
  if (featureLookupTable == null) {
    return null
  }

  const keyValue = Object.entries(LAYERS_IN_ORDER_OF_PRIORITY)
    .find(([layerIdKey, type]) => {
      const lookupValue = featureLookupTable[layerIdKey]
      return lookupValue != null
    })

  return keyValue == null
    ? null
    : keyValue[0]
}

export class MapComponent extends React.Component<any> {
  constructor(props) {
    super(props)
    this.onFeatureClick = this.onFeatureClick.bind(this)
  }

  public componentWillUnmount() {
    if (this.state == null) {
      return
    }
  }

  public onFeatureClick(features) {
    this.setUrlFromFeatures(features)
  }

  private setUrlFromFeatures(features) {
    const mostImportantFeatureId = findMostImportantFeatureThatWasClicked(features)
    if (mostImportantFeatureId == null || LAYERS_IN_ORDER_OF_PRIORITY[mostImportantFeatureId] == null) {
      return
    }
    const type = LAYERS_IN_ORDER_OF_PRIORITY[mostImportantFeatureId]
    const selectedFeatureProperties = features[mostImportantFeatureId][0].properties || {}
    const {
      gid = null,
    } = selectedFeatureProperties

    if (gid == null) {
      return
    }
    
    if (type === STREAM) {
      this.props.navigateToStream(gid)
    }

    if (type === ACCESS_POINT) {
      this.props.navigateToAccessPoint(gid)
    }
  }

  private renderMap() {
    return (
      <React.Fragment>
        <MapboxGlContainer onFeaturesSelected={this.onFeatureClick}>
          <MapboxGlCameraContainer />
          <MapboxGlCameraDirectorContainer />
        </MapboxGlContainer>
      </React.Fragment>
    )
  }

  public render() {
    const isVisible = true
    const isMapLoaded = true
    const { isReadyToInsertLayers } = this.props
    return (
      <div className={isVisible ? classes.mapContainer : classes.invisible}>
        {isMapLoaded && this.renderMap()}
        {isReadyToInsertLayers === false}
      </div>
    )
  }
}
