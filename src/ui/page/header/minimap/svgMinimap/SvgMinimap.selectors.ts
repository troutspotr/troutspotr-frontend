import { createSelector, createStructuredSelector } from 'reselect'
import * as coreSelectors from 'ui/core/Core.selectors'
import { ICameraProps } from 'ui/core/map/ICameraProps'
import {
  RegionFeatureCollection,
  UsStateFeatureCollection,
} from 'coreTypes/tableOfContents/ITableOfContentsGeoJSON'
import {
  isExpandedSelector,
  selectedUsStateName,
  selectedRegionPathName,
} from '../Minimap.selectors'

import boundingBox from '@turf/bbox'
import { FeatureCollection, GeometryObject, Feature, MultiPolygon } from 'geojson'
import {
  isOfflineSelector,
  cachedEndpointsDictionarySelector,
} from 'ui/page/offline/Offline.selectors'
import { ISvgMinimapStateProps } from './SvgMinimap.component'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { featureCollection } from '@turf/helpers'
import { IRegion } from 'coreTypes/tableOfContents/IRegion'
import { IUsState } from 'coreTypes/tableOfContents/IState'
import { selectedStateIdSelector, selectedRegionIdSelector } from 'ui/Location.selectors'
import { updateRegionCachedStatus } from 'api/tableOfContents/TableOfContentsApi'

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

const safeParam = (isExpanded: boolean, paramId: string, selectedId: string): string => {
  if (isExpanded === false) {
    return paramId
  }

  if (selectedId == null) {
    return paramId
  }

  return selectedId
}

// this is used exclusively by the minimap
export const safeSelectedUsStateNameForMinimapSelector = createSelector(
  isExpandedSelector,
  selectedStateIdSelector,
  selectedUsStateName,
  safeParam
)

// this is used exclusively by the minimap
export const safeSelectedRegionPathNameForMinimap = createSelector(
  isExpandedSelector,
  selectedStateIdSelector,
  selectedRegionIdSelector,
  selectedRegionPathName,
  selectedUsStateName,
  (
    isExpanded,
    selectedStateParam,
    selectedRegionParam,
    selectedMinimapRegionPathName,
    selectedMinimapStateName
  ): string => {
    if (isExpanded === false) {
      // if it's collapsed and theres a URL for both the state and region, then return region.
      if (selectedStateParam != null && selectedRegionParam != null) {
        return `${selectedStateParam}/${selectedRegionParam}`
      }
    }

    if (selectedMinimapStateName != null && selectedMinimapRegionPathName != null) {
      const path = `${selectedMinimapRegionPathName}`
      return path
    }
    return null
  }
)

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

  if (isExpanded === false) {
  }

  if (states.features.length > 0) {
    return createCameraObjectFromFeature(states)
  }
  return defaultCamera
}

const EMPTY_REGIONS = featureCollection<MultiPolygon, IRegion>([]) as RegionFeatureCollection
export const getSelectedRegions = createSelector(
  coreSelectors.regionsGeoJsonSelector,
  safeSelectedRegionPathNameForMinimap,
  (regions: RegionFeatureCollection, selectedId: string): RegionFeatureCollection => {
    if (regions == null || selectedId == null) {
      return EMPTY_REGIONS
    }
    const activeOrSelectedFeatures = featureCollection(
      regions.features.filter(x => x.properties.path === selectedId)
    )

    if (activeOrSelectedFeatures.features.length === 0) {
      return EMPTY_REGIONS
    }
    return activeOrSelectedFeatures as RegionFeatureCollection
  }
)

const EMPTY_STATES = featureCollection<MultiPolygon, IUsState>([]) as UsStateFeatureCollection
export const selectedUsStatesSelector = createSelector(
  coreSelectors.statesGeoJsonSelector,
  safeSelectedUsStateNameForMinimapSelector,
  (states: UsStateFeatureCollection, selectedUsStateName: string): UsStateFeatureCollection => {
    if (states == null || selectedUsStateName == null) {
      return EMPTY_STATES
    }
    const activeOrSelectedFeatures = featureCollection(
      states.features.filter(x => x.properties.short_name === selectedUsStateName)
    )

    if (activeOrSelectedFeatures.features.length === 0) {
      return EMPTY_STATES
    }

    return activeOrSelectedFeatures as UsStateFeatureCollection
  }
)

export const displayedRegionsSelector = createSelector(
  coreSelectors.regionsGeoJsonSelector,
  isExpandedSelector,
  selectedUsStatesSelector,
  isOfflineSelector,
  cachedEndpointsDictionarySelector,
  (regions, isExpanded, selectedUsStates, isOffline, cachedEndpoints): RegionFeatureCollection => {
    if (isExpanded === false) {
      return EMPTY_REGIONS
    }

    if (selectedUsStates == null || selectedUsStates.features.length === 0) {
      return EMPTY_REGIONS
    }

    const selectedStateIds = selectedUsStates.features.map(x => x.properties.short_name)[0]

    const regionsWithinSelectedStates = featureCollection(
      regions.features.filter(
        x =>
          x.properties.state_short_name === selectedStateIds &&
          (isOffline === false || x.properties.isCached)
      )
    )

    regionsWithinSelectedStates.features.map(x => {
      return updateRegionCachedStatus(x, cachedEndpoints)
    })

    return regionsWithinSelectedStates as RegionFeatureCollection
  }
)

export const displayedStatesSelector = createSelector(
  coreSelectors.statesGeoJsonSelector,
  isExpandedSelector,
  selectedUsStatesSelector,
  isOfflineSelector,
  (allFeatures, isExpanded, selectedUsStates, isOffline): UsStateFeatureCollection => {
    if (isExpanded && allFeatures != null && allFeatures.features != null) {
      return featureCollection(
        allFeatures.features.filter(x => isOffline === false || x.properties.isCached)
      ) as UsStateFeatureCollection
    }

    if (selectedUsStates == null || selectedUsStates.features.length === 0) {
      return allFeatures
    }
    return selectedUsStates
  }
)

export const minimapCameraSelector = createSelector(
  coreSelectors.regionsGeoJsonSelector,
  selectedUsStatesSelector,
  nationalCameraSelector,
  isExpandedSelector,
  getMinimapCamera
)

export const getSvgMinimapStateProps = createStructuredSelector<IReduxState, ISvgMinimapStateProps>(
  {
    usStatesGeoJson: coreSelectors.statesGeoJsonSelector,
    displayedUsStatesGeoJson: displayedStatesSelector,
    displayedRegionsGeoJson: displayedRegionsSelector,
    selectedUsStatesGeoJson: selectedUsStatesSelector,
    selectedRegionGeoJson: getSelectedRegions,
    camera: minimapCameraSelector,
    isOffline: isOfflineSelector,
    isExpanded: isExpandedSelector,
  }
)
