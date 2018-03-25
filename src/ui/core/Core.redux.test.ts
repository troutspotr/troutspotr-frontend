import {
  CORE_REDUCERS,
  GEO_SET_SELECTION,
  setSelectedMinimapGeometry,
  GEO_SET_TABLE_OF_CONTENTS,
  ICoreState,
  setTableOfContents,
} from './Core.redux'

const tableOfContents = require('static/data/v3/TableOfContents.topo.json')
import cloneDeep from 'lodash-es/cloneDeep'
import { decompress } from 'api/tableOfContents/TableOfContentsApi'
import { INITIAL_CORE_STATE } from './Core.redux'
import { SelectionStatus } from '../../coreTypes/Ui'

describe('Core.redux', () => {
  let reduxState: ICoreState = null
  beforeEach(() => {
    const stateData = decompress(cloneDeep(tableOfContents))
    reduxState = {
      ...INITIAL_CORE_STATE,
      ...CORE_REDUCERS[GEO_SET_TABLE_OF_CONTENTS](
        INITIAL_CORE_STATE,
        setTableOfContents(stateData)
      ),
    }
  })
  describe('GEO_SET_SELECTION', () => {
    it('returns original state if no states or regions geojson loaded', () => {
      // arrange
      reduxState.statesGeoJson = null
      reduxState.statesDictionary = null
      reduxState.regionsGeoJson = null
      reduxState.regionDictionary = null

      // act
      const results = CORE_REDUCERS[GEO_SET_SELECTION](
        reduxState,
        setSelectedMinimapGeometry({
          usStateShortName: 'mn',
        })
      )
      // assert
      expect(results).toEqual(reduxState)
    })

    it('doesnt do anything if no state is selected', () => {
      // arrange

      // act
      const results = CORE_REDUCERS[GEO_SET_SELECTION](
        reduxState,
        setSelectedMinimapGeometry({
          usStateShortName: null,
          regionPathName: '',
        })
      )
      // assert
      expect(results).toEqual(reduxState)
    })

    test.only('selecting state activiates regions inside selected state', () => {
      // arrange
      const driftlessPath = 'mn/driftless'
      const minnesotaShortName = 'mn'
      // act
      const results = CORE_REDUCERS[GEO_SET_SELECTION](
        reduxState,
        setSelectedMinimapGeometry({
          usStateShortName: minnesotaShortName,
          regionPathName: driftlessPath,
        })
      )

      // now update state AGAIN to unselect the region.
      // just pass the us state name -- no region!
      const results2 = CORE_REDUCERS[GEO_SET_SELECTION](
        results,
        setSelectedMinimapGeometry({ usStateShortName: minnesotaShortName })
      )
      // assert
      const driftlessRegionShouldntBeSelected = results2.regionDictionary[driftlessPath]
      const minnesota = results2.statesDictionary[minnesotaShortName]

      if (driftlessRegionShouldntBeSelected == null) {
        throw new Error('couldnt find driftless -- should exist')
      }

      if (minnesota == null) {
        throw new Error('couldnt find minnesota -- should exist')
      }

      expect(driftlessRegionShouldntBeSelected.properties.selectionStatus).toBe(
        SelectionStatus.Active
      )
      expect(minnesota.properties.selectionStatus).toBe(SelectionStatus.Selected)
    })

    it('selecting state activates regions', () => {
      // arrange
      const driftlessPath = 'mn/driftless'
      const minnesotaShortName = 'mn'
      // act
      const results = CORE_REDUCERS[GEO_SET_SELECTION](
        reduxState,
        setSelectedMinimapGeometry({
          usStateShortName: minnesotaShortName,
          regionPathName: driftlessPath,
        })
      )

      // now update state AGAIN to unselect the region.
      // just pass the us state name -- no region!
      const results2 = CORE_REDUCERS[GEO_SET_SELECTION](
        results,
        setSelectedMinimapGeometry({ usStateShortName: minnesotaShortName })
      )
      // assert
      const minnesota = results2.statesDictionary[minnesotaShortName]

      if (minnesota == null) {
        throw new Error('couldnt find minnesota -- should exist')
      }

      expect(minnesota.properties.selectionStatus).toBe(SelectionStatus.Selected)
      results2.regionsGeoJson.features.forEach(f => {
        const isUnderState = f.properties.state_short_name.toLowerCase() === minnesotaShortName
        if (isUnderState) {
          expect(f.properties.selectionStatus === SelectionStatus.Active)
        } else {
          expect(f.properties.selectionStatus === SelectionStatus.Inactive)
        }
      })
    })
  })
})
