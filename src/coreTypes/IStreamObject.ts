import { Feature, LineString, MultiPolygon, Point } from 'geojson'
import { IAccessPointGeoJsonProps } from 'coreTypes/accessPoint/IAccessPoint'
export interface IStreamObject {
  readonly accessPoints: ReadonlyArray<Feature<Point, IAccessPointGeoJsonProps>>
  readonly palSections: ReadonlyArray<Feature<LineString>>
  readonly stream: Feature<LineString>
  readonly restrictions: ReadonlyArray<Feature<LineString>>
  readonly sections: ReadonlyArray<Feature<LineString>>
  readonly circle: MultiPolygon
}
