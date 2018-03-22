import { IAccessPointGeoJsonProps } from 'coreTypes/accessPoint/IAccessPoint'
import { IStreamObject } from 'coreTypes/IStreamObject'
import { Feature, Point } from 'geojson'
import * as React from 'react'

export interface IDetailsComponentStateProps {
  specialRegulationsCurrentSeason: any
  selectedAccessPoint: Feature<Point, IAccessPointGeoJsonProps>
  hoveredRoad: Feature<Point, IAccessPointGeoJsonProps>
  location: any
}

export interface IDetailsComponentDispatchProps {
  setHoveredRoad: any
  setSelectedRoad: any
  setHoveredStream: any
}

export interface IDetailsComponent
  extends IDetailsComponentStateProps,
    IDetailsComponentDispatchProps {
  selectedStream: IStreamObject
}

class DetailsComponent extends React.Component<IDetailsComponent> {
  public renderRestrictions() {
    return null
  }

  public render() {
    return null
  }
}

export default DetailsComponent
