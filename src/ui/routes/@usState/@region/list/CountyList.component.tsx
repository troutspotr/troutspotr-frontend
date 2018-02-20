import * as React from 'react'
const classes = require('./List.scss')
import isEmpty from 'lodash-es/isEmpty'
import StreamListComponent from './StreamList.component'
class CountyListComponent extends React.Component<any> {
  renderCounty(county, index) {
    const { gid, name, streams } = county
    return (
      <li key={gid} className={classes.countyListItem}>
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
      </li>
    )
  }

  renderCounties() {
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

  render() {
    return (
      <div className={classes.listViewContainer}>
        {this.renderCounties()}
        <div className={classes.godAwfulPlaceholder} />
      </div>
    )
  }
}

// CountyListComponent.propTypes = {
//   'isListVisible': PropTypes.bool.isRequired,
//   'visibleCounties': PropTypes.array.isRequired,
//   'selectedState': PropTypes.string.isRequired,
//   'selectedRegion': PropTypes.string.isRequired,
//   'getSummary': PropTypes.func.isRequired,
// }

export default CountyListComponent
