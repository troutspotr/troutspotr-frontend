import { Map } from 'mapbox-gl'
import { Component } from 'react'
import { connect } from 'react-redux'
import { AccessPointFeature } from 'api/region/IRegionGeoJSON'
import { IStreamObject } from 'coreTypes/IStreamObject'
import { isEmpty, clamp } from 'lodash'
import { selectMapFeature, selectFoculPoint } from '../Map.redux.interactivity'
import { createStructuredSelector } from 'reselect'
import { getSelectedRoadSelector, selectedStreamObjectSelector } from '../../@usState/@region/Region.selectors'
import { selectedRegionIdSelector } from '../../../Location.selectors';

interface IMapboxGlCameraDirectorStateProps {
  selectedAccessPointFeature: AccessPointFeature,
  selectedStreamObject: IStreamObject,
  selectedRegionId: string,
}

interface IMapboxGlCameraDirectorDispatchProps {
  selectMapFeature(feature): void,
  selectFoculPoint(feature): void,
}

interface IMapboxGlCameraDirectorPassedProps {
  map?: Map
}

interface IMapboxGlCameraDirectorProps extends IMapboxGlCameraDirectorStateProps, IMapboxGlCameraDirectorDispatchProps, IMapboxGlCameraDirectorPassedProps {}


class MapboxGlCameraDirectorComponent extends Component<IMapboxGlCameraDirectorProps> {
  public componentDidUpdate(previousProps) {
    this.performZoomOnFeature(previousProps, this.props)
    try {
      const isUserLookingAtMap = true
      const isUserHitBackButton = isEmpty(previousProps.selectedStreamObject) === false && isEmpty(this.props.selectedStreamObject)
      const userChangedRegions = previousProps.selectedRegionId !== this.props.selectedRegionId
      const shouldBounceOutALittle = isUserLookingAtMap && isUserHitBackButton && userChangedRegions === false
      if (userChangedRegions === false && shouldBounceOutALittle) {
        const currentZoom = this.props.map.getZoom()
        const newZoom = this.getZoomBackbounce(currentZoom)
        setTimeout(() => this.props.map.easeTo({'bearing': 0, 'pitch': 0, 'zoom': newZoom}), 30)
      }
    } catch (e) {
      console.error(e)
    }
  }

  private performZoomOnFeature (previousProps, nextProps) {
    if (isEmpty(nextProps.selectedStreamObject)) {
      return
    }

    const isNewStreamSelection = nextProps.selectedStreamObject !== previousProps.selectedStreamObject
    const isSelectedNewRoad = nextProps.selectedAccessPointFeature !== previousProps.selectedAccessPointFeature && isEmpty(nextProps.selectedAccessPointFeature) === false
    if (isNewStreamSelection) {
      if (isSelectedNewRoad) {
        previousProps.selectFoculPoint(nextProps.selectedAccessPointFeature)
        return
      }
      if (nextProps.selectedStreamObject != null) {
        previousProps.selectMapFeature({
          'type': 'FeatureCollection',
          'features': nextProps.selectedStreamObject.sections,
        })
        return
      }
    }

    if (isSelectedNewRoad) {
      previousProps.selectFoculPoint(nextProps.selectedAccessPointFeature)
      return
    }

    if (nextProps.selectedAccessPointFeature == null && previousProps.selectedAccessPointFeature != null) {
      previousProps.selectMapFeature({
        'type': 'FeatureCollection',
        'features': nextProps.selectedStreamObject.sections,
      })
    }
  }

  private getZoomBackbounce (currentZoom, minZoom = 7, maxZoom = 15, boostMultiplier = 3.5) {
    const clampedZoom = clamp(currentZoom, minZoom, maxZoom)
    const normalizedBoost = (clampedZoom - minZoom) / (maxZoom - minZoom)
    const boostBack = (normalizedBoost * boostMultiplier) + 0.2
    return currentZoom - boostBack
  }

  public render () {
    return null
  }
}

const mapboxCameraDirectorPropsSelector = createStructuredSelector({
  selectedAccessPointFeature: getSelectedRoadSelector,
  selectedStreamObject: selectedStreamObjectSelector,
  selectedRegionId: selectedRegionIdSelector,
})

const mapStateToProps = reduxState => mapboxCameraDirectorPropsSelector(reduxState)
const dispatchToProps = {
  selectMapFeature: feature => selectMapFeature(feature),
  selectFoculPoint: feature => selectFoculPoint(feature),
}

export const MapboxGlCameraDirectorContainer = connect(mapStateToProps, dispatchToProps)(MapboxGlCameraDirectorComponent)
