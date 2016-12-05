import React from 'react'
import classes from './List.scss'
import { isEmpty } from 'lodash'
// import BubbleComponent from './Bubble.component'
// import StreamItemContainer from './streamItem/StreamItem.container'
import StreamListComponent from './StreamList.component'
const CountyListComponent = React.createClass({
  propTypes: {
    isListVisible: React.PropTypes.bool.isRequired,
    visibleCounties: React.PropTypes.array.isRequired,
    selectedState: React.PropTypes.string.isRequired,
    selectedRegion: React.PropTypes.string.isRequired
  },

  componentDidMount () {
    // console.log('LIST VIEW MOUNTED')
  },

  renderCounty (county, index) {
    let { gid, name, streams } = county
    return (<li key={gid}>
      <div className={classes.listTitle}>{name} Co.</div>
      <StreamListComponent
        isListVisible={this.props.isListVisible}
        visibleTroutStreams={streams}
        selectedState={this.props.selectedState}
        selectedRegion={this.props.selectedRegion} />
    </li>)
  },

  renderCounties () {
    let { visibleCounties } = this.props
    if (isEmpty(visibleCounties)) {
      return null
    }

    return (<ul className={classes.list}>
      {visibleCounties.map((county, index) => this.renderCounty(county, index))}
    </ul>)
  },

  render () {
    let { isListVisible } = this.props
    return (
      <div className={isListVisible ? classes.listViewContainer : classes.invisible}>
        {this.renderCounties()}
      </div>)
  }
})
export default CountyListComponent
