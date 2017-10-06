import React, { Component } from 'react'
import classes from './List.scss'
import { isEmpty } from 'lodash'
import StreamListComponent from './StreamList.component'
import shallowCompare from 'shallow-compare'
class CountyListComponent extends Component {
  renderCounty (county, index) {
    let { gid, name, streams } = county
    return (<li key={gid} className={classes.countyListItem}>
      <div className={classes.listHeaderContainer}>

        <h2 className={classes.listTitle}>{name} Co.</h2>
      </div>
      <StreamListComponent
        getSummary={this.props.getSummary}
        isListVisible={this.props.isListVisible}
        visibleTroutStreams={streams}
        selectedState={this.props.selectedState}
        selectedRegion={this.props.selectedRegion}
      />
    </li>)
  }

  shouldComponentUpdate (nextProps, nextState) {
    let shouldUpdate = shallowCompare(this, nextProps, nextState)
    return shouldUpdate
  }

  renderCounties () {
    let { visibleCounties } = this.props
    if (isEmpty(visibleCounties)) {
      return null
    }

    return (<ul className={classes.countyListContainer}>
      {visibleCounties.map((county, index) => this.renderCounty(county, index))}
    </ul>)
  }

  render () {
    return (
      <div className={classes.listViewContainer}>
        {this.renderCounties()}
        <div className={classes.godAwfulPlaceholder} />
      </div>)
  }
}

CountyListComponent.propTypes = {
  isListVisible: React.PropTypes.bool.isRequired,
  visibleCounties: React.PropTypes.array.isRequired,
  selectedState: React.PropTypes.string.isRequired,
  selectedRegion: React.PropTypes.string.isRequired,
  getSummary: React.PropTypes.func.isRequired
}

export default CountyListComponent
