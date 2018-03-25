import * as selectors from './Core.selectors'
import keyBy from 'lodash-es/keyBy'
const tableOfContents = require('static/data/v3/TableOfContents.topo.json')
import {
  INITIAL_CORE_STATE,
  GEO_SET_TABLE_OF_CONTENTS,
  CORE_REDUCERS,
  setTableOfContents,
  ICoreState,
} from 'ui/core/Core.redux'
import cloneDeep from 'lodash-es/cloneDeep'
import { decompress } from 'api/tableOfContents/TableOfContentsApi'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'

describe('Core.selectors', () => {
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
      offline: null,
      region: null,
      mapbox: null,
      minimap: null,
      map: null,
    }
  })

  it('selectedStateIdSelector', () => {
    selectors.statesGeoJsonSelector(reduxState)
    const result = keyBy(null)
    expect(result).toEqual({})
  })

  it('selectedRegionIdSelector', () => {
    selectors.statesGeoJsonSelector(reduxState)
    const result = keyBy(null)
    expect(result).toEqual({})
  })

  it('selectedStreamIdSelector', () => {
    selectors.statesGeoJsonSelector(reduxState)
    const result = keyBy(null)
    expect(result).toEqual({})
  })

  it('selectedStateSelector', () => {
    selectors.statesGeoJsonSelector(reduxState)
    const result = keyBy(null)
    expect(result).toEqual({})
  })

  it('isSearchingSelector', () => {
    selectors.statesGeoJsonSelector(reduxState)
    const result = keyBy(null)
    expect(result).toEqual({})
  })

  it('selectedRegionPathKeySelector', () => {
    selectors.statesGeoJsonSelector(reduxState)
    const result = keyBy(null)
    expect(result).toEqual({})
  })

  it('selectedRegionSelector', () => {
    selectors.statesGeoJsonSelector(reduxState)
    const result = keyBy(null)
    expect(result).toEqual({})
  })
})
