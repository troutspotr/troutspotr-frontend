import AnonymousAnalyzerApi, { IAnonymousAnalyzerApi } from 'api/tracking/AnonymousAnalyzerApi'
import RegionApi, { IRegionApi } from 'api/region/Region.api'
import StateApi, { IStateApi } from 'api/usState/StateApi'
import TableOfContentsApi from 'api/tableOfContents/TableOfContentsApi'
import { ITableOfContentsApi } from './tableOfContents/TableOfContentsApi'
export interface IApiModule {
  AnonymousAnalyzerApi: IAnonymousAnalyzerApi
  RegionApi: IRegionApi
  StateApi: IStateApi
  TableOfContentsApi: ITableOfContentsApi
}
export { AnonymousAnalyzerApi, RegionApi, StateApi, TableOfContentsApi }
