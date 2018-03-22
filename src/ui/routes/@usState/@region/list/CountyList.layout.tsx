import * as React from 'react'
const classes = require('./List.scss')
import isEmpty from 'lodash-es/isEmpty'

export interface ICountyLayout {
  gid: number
  name: string
  items: React.ReactNode[]
}

export interface ICountyListLayoutProps {
  isListVisible: boolean
  visibleCounties: ICountyLayout[]
}

export class CountyListLayoutComponent extends React.Component<ICountyListLayoutProps> {
  public renderCounty(county, index) {
    const { gid, name, items } = county
    return (
      <li key={gid} className={classes.countyListItem}>
        <div className={classes.listHeaderContainer}>
          <h4 className={classes.listTitle}>{name} Co.</h4>
        </div>
        <div className={classes.streamList}>{items}</div>
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
