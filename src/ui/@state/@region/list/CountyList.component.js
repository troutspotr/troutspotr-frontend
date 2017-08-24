import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './List.scss'
import {isEmpty} from 'lodash'
import StreamListComponent from './StreamList.component'
import shallowCompare from 'shallow-compare'
class CountyListComponent extends Component {
  renderCounty (county, index) {
    const {gid, name, streams} = county
    return (<li key={gid} className={classes.countyListItem}>
      <div className={classes.listHeaderContainer}>

        <div className={classes.listTitle}>{name} Co.</div>
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
    const shouldUpdate = shallowCompare(this, nextProps, nextState)
    return shouldUpdate
  }

  renderCounties () {
    const {visibleCounties} = this.props
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
  'isListVisible': PropTypes.bool.isRequired,
  'visibleCounties': PropTypes.array.isRequired,
  'selectedState': PropTypes.string.isRequired,
  'selectedRegion': PropTypes.string.isRequired,
  'getSummary': PropTypes.func.isRequired,
}

export default CountyListComponent
