import * as selectors from './SvgMinimap.selectors'
const tableOfContents = require('static/data/v3/TableOfContents.topo.json')
import cloneDeep from 'lodash-es/cloneDeep'
import { decompress } from 'api/tableOfContents/TableOfContentsApi'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import {
  ICoreState,
  INITIAL_CORE_STATE,
  CORE_REDUCERS,
  GEO_SET_TABLE_OF_CONTENTS,
  setTableOfContents,
  // setSelectedMinimapGeometry,
  // GEO_SET_SELECTION,
} from 'ui/core/Core.redux'
import { DEFAULT_CAMERA_PROPS } from './SvgMinimap.selectors'
import { featureCollection } from '@turf/helpers'
import { FeatureCollection } from 'geojson'
import {
  INITIAL_MINIMAP_STATE,
  setSelectedMinimapGeometry,
  GEO_SET_SELECTION,
} from '../Minimap.redux'

describe('SvgMinimap.selectors', () => {
  let reduxState: IReduxState = null
  beforeEach(() => {
    const coreState: ICoreState = {
      ...INITIAL_CORE_STATE,
      ...CORE_REDUCERS[GEO_SET_TABLE_OF_CONTENTS](
        INITIAL_CORE_STATE,
        setTableOfContents(decompress(cloneDeep(tableOfContents)))
      ),
    }

    reduxState = {
      core: coreState,
      usState: null,
      routing: null,
      gps: null,
      offline: {
        cachedEndpoints: [],
        isOffline: false,
      },
      region: null,
      mapbox: null,
      minimap: {
        ...INITIAL_MINIMAP_STATE,
        isExpanded: true,
      },
      map: null,
      errors: null,
    }
  })
  describe('getMinimapCamera', () => {
    it('handles null', () => {
      // arrange
      const region = null
      const state = null
      const isExpanded = null

      // act
      const camera = selectors.getMinimapCamera(
        region,
        state,
        selectors.DEFAULT_CAMERA_PROPS,
        isExpanded
      )

      // assert
      expect(camera).toEqual(DEFAULT_CAMERA_PROPS)
    })

    it('returns state-level if not expanded and region/state is selected', () => {
      // arrange
      const region = null
      const state = null
      const isExpanded = null

      // act
      const camera = selectors.getMinimapCamera(
        region,
        state,
        selectors.DEFAULT_CAMERA_PROPS,
        isExpanded
      )

      // assert
      const cameraStateLevel = selectors.getMinimapCamera(
        null,
        state,
        selectors.DEFAULT_CAMERA_PROPS,
        isExpanded
      )
      expect(camera).toEqual(cameraStateLevel)
    })
  })

  describe('camera', () => {
    it('handles non-selection by zooming all the way out', () => {
      // arrange
      const unselectArguments = {
        usStateShortName: '',
        regionPathName: '',
      }
      const unselectAction = setSelectedMinimapGeometry(unselectArguments)
      const updatedCoreState = CORE_REDUCERS[GEO_SET_SELECTION](reduxState.core, unselectAction)
      reduxState = {
        ...reduxState,
        core: updatedCoreState,
      }

      const expectedCamera = selectors.createCameraObjectFromFeature(reduxState.core.statesGeoJson)
      // act
      const camera = selectors.minimapCameraSelector(reduxState)

      // assert
      expect(camera).toEqual(expectedCamera)
    })

    it('gives default camera if no state selected', () => {
      // arrange
      const unselectArguments = {
        usStateShortName: '',
        regionPathName: 'mn/driftless',
      }
      const unselectAction = setSelectedMinimapGeometry(unselectArguments)
      const updatedCoreState = CORE_REDUCERS[GEO_SET_SELECTION](reduxState.core, unselectAction)
      reduxState = {
        ...reduxState,
        core: updatedCoreState,
      }
      const expectedCamera = selectors.createCameraObjectFromFeature(reduxState.core.statesGeoJson)

      // act
      const camera = selectors.minimapCameraSelector(reduxState)

      // assert
      expect(camera).toEqual(expectedCamera)
    })

    it('gives state-level camera if only state selected', () => {
      // arrange
      const unselectArguments = {
        usStateShortName: 'mn',
        regionPathName: '',
      }
      const unselectAction = setSelectedMinimapGeometry(unselectArguments)
      const updatedCoreState = CORE_REDUCERS[GEO_SET_SELECTION](reduxState.core, unselectAction)
      reduxState = {
        ...reduxState,
        core: updatedCoreState,
        minimap: {
          ...INITIAL_MINIMAP_STATE,
          isExpanded: true,
        },
      }
      const minnesotaFeature = reduxState.core.statesGeoJson.features.find(
        x => x.properties.short_name === unselectArguments.usStateShortName
      )

      const minnesota = featureCollection([minnesotaFeature]) as FeatureCollection<any, any>
      const expectedCamera = selectors.createCameraObjectFromFeature(minnesota)

      // act
      const camera = selectors.minimapCameraSelector(reduxState)

      // assert
      expect(camera).toEqual(expectedCamera)
    })

    it('gives region-level camera if state and region selected', () => {
      // arrange
      const unselectArguments = {
        usStateShortName: 'mn',
        regionPathName: 'mn/driftless',
      }
      const unselectAction = setSelectedMinimapGeometry(unselectArguments)
      const updatedCoreState = CORE_REDUCERS[GEO_SET_SELECTION](reduxState.core, unselectAction)
      reduxState = {
        ...reduxState,
        core: updatedCoreState,
      }

      const driftlessFeature = reduxState.core.regionsGeoJson.features.find(
        x => x.properties.state_short_name === unselectArguments.usStateShortName
      )

      const driftless = featureCollection([driftlessFeature]) as FeatureCollection<any, any>
      const expectedCamera = selectors.createCameraObjectFromFeature(driftless)

      // act
      const camera = selectors.minimapCameraSelector(reduxState)

      // assert
      expect(camera).toEqual(expectedCamera)
    })
  })

  describe('props', () => {
    it('does stuff', () => {
      selectors.getSvgMinimapStateProps(reduxState)
    })
  })
})
