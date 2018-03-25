import { createSelector, createStructuredSelector } from 'reselect'
import * as coreSelectors from 'ui/core/Core.selectors'
import { ICameraProps } from 'ui/core/map/ICameraProps'
import {
  RegionFeatureCollection,
  UsStateFeatureCollection,
} from 'coreTypes/tableOfContents/ITableOfContentsGeoJSON'
import { isExpandedSelector } from '../Minimap.selectors'

import boundingBox from '@turf/bbox'
import { FeatureCollection, GeometryObject, Feature, MultiPolygon } from 'geojson'
import { ISelectable, SelectionStatus } from '../../../../../coreTypes/Ui'
import { isOfflineSelector } from '../../../offline/Offline.selectors'
import { ISvgMinimapStateProps } from './SvgMinimap.component'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { featureCollection } from '@turf/helpers'
import { IRegion } from 'coreTypes/tableOfContents/IRegion'

export const DEFAULT_CAMERA_PROPS = {
  bbox: [[-124.7317182880231, 31.332200267081696], [-96.43933500000001, 49.00241065464817]],
  pitch: 0,
  bearing: 0,
  speed: 0,
  padding: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
}

export const createCameraObjectFromFeature = (
  feature: Feature<GeometryObject, any> | FeatureCollection<GeometryObject, any>
): ICameraProps => {
  if (feature == null) {
    return { ...DEFAULT_CAMERA_PROPS }
  }
  const bbox = boundingBox(feature as any)
  const bounds = [[bbox[0], bbox[1]], [bbox[2], bbox[3]]]
  return {
    ...DEFAULT_CAMERA_PROPS,
    bbox: bounds,
  }
}

export const getSelectedItem = (
  geom: FeatureCollection<GeometryObject, ISelectable>,
  status: SelectionStatus = SelectionStatus.Selected
): Feature<GeometryObject, ISelectable> => {
  if (geom == null || geom.features == null) {
    return null
  }

  var i = geom.features.length
  while (i--) {
    const item = geom.features[i]
    if (item.properties.selectionStatus === status) {
      return item
    }
  }

  return null
}

export const nationalCameraSelector = createSelector(
  coreSelectors.statesGeoJsonSelector,
  (regions): ICameraProps => {
    if (regions == null || regions.features == null) {
      return DEFAULT_CAMERA_PROPS
    }

    return createCameraObjectFromFeature(regions)
  }
)

export const getMinimapCamera = (
  regions: RegionFeatureCollection,
  states: UsStateFeatureCollection,
  defaultCamera: ICameraProps,
  isExpanded: boolean
): ICameraProps => {
  if (regions == null || states == null) {
    return defaultCamera
  }
  const selectedRegion = getSelectedItem(regions)
  const selectedState = getSelectedItem(states, SelectionStatus.Selected)
  if (selectedRegion != null && selectedState != null) {
    if (isExpanded === false) {
      return createCameraObjectFromFeature(selectedState)
    }
    return createCameraObjectFromFeature(selectedRegion)
  }

  if (selectedState != null) {
    return createCameraObjectFromFeature(selectedState)
  }

  return defaultCamera
}

export const minimapCameraSelector = createSelector(
  coreSelectors.regionsGeoJsonSelector,
  coreSelectors.statesGeoJsonSelector,
  nationalCameraSelector,
  isExpandedSelector,
  getMinimapCamera
)

const EMPTY_REGIONS = featureCollection<MultiPolygon, IRegion>([]) as RegionFeatureCollection
export const getDisplayedMinimapRegions = createSelector(
  coreSelectors.regionsGeoJsonSelector,
  (regions: RegionFeatureCollection): RegionFeatureCollection => {
    if (regions == null) {
      return EMPTY_REGIONS
    }
    const activeOrSelectedFeatures = featureCollection(
      regions.features.filter(x => {
        return (
          x.properties.selectionStatus === SelectionStatus.Active ||
          x.properties.selectionStatus === SelectionStatus.Selected
        )
      })
    )

    if (activeOrSelectedFeatures.features.length === 0) {
      return EMPTY_REGIONS
    }
    return activeOrSelectedFeatures as RegionFeatureCollection
  }
)

export const getSvgMinimapStateProps = createStructuredSelector<IReduxState, ISvgMinimapStateProps>(
  {
    usStatesGeoJson: coreSelectors.statesGeoJsonSelector,
    regionsGeoJson: getDisplayedMinimapRegions,
    camera: minimapCameraSelector,
    isOffline: isOfflineSelector,
    isExpanded: isExpandedSelector,
  }
)
