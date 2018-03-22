import { IStream } from 'coreTypes/stream/IStream'
import { Feature, LineString, MultiPolygon } from 'geojson'
import {
  AccessPointFeature,
  TroutStreamSectionFeature,
  PalSectionFeature,
  RestrictionFeature,
} from 'api/region/IRegionGeoJSON'

export type AccessPointFeatures = ReadonlyArray<AccessPointFeature>
export type TroutStreamSectionFeatures = ReadonlyArray<TroutStreamSectionFeature>
export type PalSectionFeatures = ReadonlyArray<PalSectionFeature>

export interface IStreamObject {
  readonly accessPoints: AccessPointFeatures
  readonly palSections: PalSectionFeatures
  readonly stream: Feature<LineString, IStream>
  readonly restrictions: ReadonlyArray<RestrictionFeature>
  readonly sections: TroutStreamSectionFeatures
  readonly circle: MultiPolygon
}
