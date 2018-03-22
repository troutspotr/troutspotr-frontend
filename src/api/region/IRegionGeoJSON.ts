import { Feature, LineString, MultiPolygon, Point, FeatureCollection } from 'geojson'

import { IStream } from 'coreTypes/stream/IStream'
import { ITroutStreamSection } from 'coreTypes/stream/ITroutStreamSection'
import { IPalSection } from 'coreTypes/pal/IPalSection'
import { IAccessPointGeoJsonProps } from 'coreTypes/accessPoint/IAccessPoint'
import { IRestrictionSection } from 'coreTypes/restriction/IRestrectionSection'
import { IPal } from 'coreTypes/pal/IPal'
import { Polygon } from '@turf/helpers'
import { IBoundingCircle } from 'coreTypes/boundingCircle/IBoundingCircle'
import { ITributary } from 'coreTypes/tributary/ITributary'

export type AccessPointFeature = Feature<Point, IAccessPointGeoJsonProps>
export type StreamFeature = Feature<LineString, IStream>
export type PalSectionFeature = Feature<LineString, IPalSection>
export type TroutStreamSectionFeature = Feature<LineString, ITroutStreamSection>
export type RestrictionFeature = Feature<LineString, IRestrictionSection>
export type PalFeature = Feature<MultiPolygon, IPal>
export type BoundingCircleFeature = Feature<Polygon, IBoundingCircle>
export type TributaryFeature = Feature<Point, ITributary>

export type AccessPointFeatureCollection = FeatureCollection<Point, IAccessPointGeoJsonProps>
export type StreamFeatureCollection = FeatureCollection<LineString, IStream>
export type PalSectionFeatureCollection = FeatureCollection<LineString, IPalSection>
export type TroutStreamSectionFeatureCollection = FeatureCollection<LineString, ITroutStreamSection>
export type RestrictionFeatureCollection = FeatureCollection<LineString, IRestrictionSection>
export type PalFeatureCollection = FeatureCollection<MultiPolygon, IPal>
export type BoundingCircleFeatureCollection = FeatureCollection<Polygon, IBoundingCircle>
export type TributaryFeatureCollection = FeatureCollection<Point, ITributary>
