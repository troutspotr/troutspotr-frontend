import { IUsState } from 'coreTypes/tableOfContents/IState'
import { ICounty } from 'coreTypes/tableOfContents/ICounty'
import { IRegion } from 'coreTypes/tableOfContents/IRegion'

export interface ITableOfContentsData {
  states: IUsState
  counties: ICounty
  regions: IRegion
}
