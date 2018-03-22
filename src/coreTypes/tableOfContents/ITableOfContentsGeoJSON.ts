import { Feature, MultiPolygon, FeatureCollection } from 'geojson'
import { ICounty } from './ICounty'
import { IRegion } from './IRegion'
import { IUsState } from './IState'

export type CountyFeature = Feature<MultiPolygon, ICounty>
export type RegionFeature = Feature<MultiPolygon, IRegion>
export type UsStateFeature = Feature<MultiPolygon, IUsState>

export type CountyFeatureCollection = FeatureCollection<MultiPolygon, ICounty>
export type RegionFeatureCollection = FeatureCollection<MultiPolygon, IRegion>
export type UsStateFeatureCollection = FeatureCollection<MultiPolygon, IUsState>
