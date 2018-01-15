import { Feature, LineString, MultiPolygon, Point } from 'geojson'

export interface IStreamObject {
  readonly accessPoints: ReadonlyArray<Feature<Point>>
  readonly palSections: ReadonlyArray<Feature<LineString>>
  readonly stream: Feature<LineString>
  readonly restrictions: ReadonlyArray<Feature<LineString>>
  readonly troutSections: ReadonlyArray<Feature<LineString>>
  readonly circle: MultiPolygon
}
