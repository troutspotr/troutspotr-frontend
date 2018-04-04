import {
  UsStateFeatureCollection,
  CountyFeatureCollection,
  RegionFeatureCollection,
} from 'coreTypes/tableOfContents/ITableOfContentsGeoJSON'

export interface ITableOfContentsData {
  states: UsStateFeatureCollection
  counties: CountyFeatureCollection
  regions: RegionFeatureCollection
}
