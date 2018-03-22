import * as React from 'react'
const classes = require('./List.scss')
import isEmpty from 'lodash-es/isEmpty'
import StreamListComponent from './StreamList.component'
import { IStreamObject } from 'coreTypes/IStreamObject'
import { IMiscRegsProperties } from 'ui/core/regulations/RegulationsSummary.selectors'

export interface ICountyItem {
  gid: number
  name: string
  streams: IStreamObject[]
}

export interface ICountyListProps {
  isListVisible: boolean
  visibleCounties: ICountyItem[]
  selectedState: string
  selectedRegion: string
  getSummary(stream: IStreamObject): IMiscRegsProperties
}

export class CountyListComponent extends React.Component<ICountyListProps> {
  public renderCounty(county, index) {
    const { gid, name, streams } = county
    return (
      <li key={gid} className={classes.countyListItem}>
        <div className={classes.listHeaderContainer}>
          <h4 className={classes.listTitle}>{name} Co.</h4>
        </div>
        <StreamListComponent
          isListVisible={this.props.isListVisible}
          visibleTroutStreams={streams}
          selectedState={this.props.selectedState}
          selectedRegion={this.props.selectedRegion}
        />
      </li>
    )
  }

  public renderCounties() {
    const { visibleCounties } = this.props
    if (isEmpty(visibleCounties)) {
      return null
    }

    return (
      <ul className={classes.countyListContainer}>
        {visibleCounties.map((county, index) => this.renderCounty(county, index))}
      </ul>
    )
  }

  public render() {
    return (
      <div className={classes.listViewContainer}>
        {this.renderCounties()}
        <div className={classes.godAwfulPlaceholder} />
      </div>
    )
  }
}
