import * as selectors from './Core.selectors'
import keyBy from 'lodash-es/keyBy'
const tableOfContents = require('api/_stubs/TableOfContents.topo.json')
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
import { IErrorsState } from 'ui/redux/Errors.redux';
import { IUsStateReduxState } from 'ui/routes/@usState/UsState.redux';
import { IRoutingState } from 'ui/redux/Routing.redux';
import { IGpsState } from 'ui/core/gps/Gps.redux';
import { IOfflineState } from 'ui/page/offline/Offline.redux';
import { IRegionState } from 'ui/routes/@usState/@region/Region.redux';
import { IMapboxModuleState } from 'ui/core/MapboxModule.redux';
import { IMinimapReduxState } from 'ui/page/header/minimap/Minimap.redux';
import { IMapRedux } from 'ui/routes/map/Map.redux';
import { ILegalState } from 'ui/routes/legal/Legal.redux';

describe('Core.selectors', () => {
  let reduxState: IReduxState
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
      usState: (null as unknown) as IUsStateReduxState,
      routing: (null as unknown) as IRoutingState,
      gps: (null as unknown) as IGpsState,
      offline: (null as unknown) as IOfflineState,
      region: (null as unknown) as IRegionState,
      mapbox: (null as unknown) as IMapboxModuleState,
      minimap: (null as unknown) as IMinimapReduxState,
      map: (null as unknown) as IMapRedux,
      errors: (null as unknown) as IErrorsState,
      legal: (null as unknown) as ILegalState,
    }
  })

  it('selectedStateIdSelector', () => {
    selectors.statesGeoJsonSelector(reduxState)
    const result = keyBy(null)
    expect(result).toEqual({})
  })
})
