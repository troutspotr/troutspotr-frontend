import * as React from 'react'
import { Feature, MultiPolygon, Point } from 'geojson'
import { ICounty } from 'coreTypes/tableOfContents/ICounty'
import { IState } from 'coreTypes/tableOfContents/IState'
import { IRegion } from 'coreTypes/tableOfContents/IRegion'
import { ICameraProps } from 'ui/core/map/ICameraProps'

export interface IMinimapProps {
  readonly isExpanded: boolean
  readonly usStatesGeojson: ReadonlyArray<Feature<MultiPolygon, IState>>
  readonly regionsGeojson: ReadonlyArray<Feature<MultiPolygon, IRegion>>
  readonly countiesGeojson: ReadonlyArray<Feature<MultiPolygon, ICounty>>
  readonly cachedRegionsGeojson: ReadonlyArray<Feature<MultiPolygon, IRegion>>
  readonly gpsFeature: Feature<Point>

  readonly camera: ICameraProps
  readonly handleFeatureSelected: any
  readonly handleExpand: any
}

export default class MinimapSvgComponent extends React.PureComponent<IMinimapProps> {
  render() {
    return null
  }
}
