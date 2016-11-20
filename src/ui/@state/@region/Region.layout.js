import React, { PropTypes } from 'react'
import classes from './Region.scss'
import { MAP, LIST } from 'ui/core/Core.state'
import MapContainer from './map/Map.container'
import ListComponent from './list/StreamList.container'
// console.log(MAP, LIST)
const RegionLayout = React.createClass({
  propTypes: {
    view: PropTypes.string.isRequired,
    children: PropTypes.element,
    fetchRegionData: PropTypes.func.isRequired,
    selectedState: PropTypes.string.isRequired,
    selectedRegion: PropTypes.string.isRequired
  },

  componentDidMount () {
    let { fetchRegionData, selectedState, selectedRegion } = this.props
    fetchRegionData(selectedState, selectedRegion)
  },

  renderMap () {
    let { view } = this.props
    let isVisible = view === MAP
    return <MapContainer
      isVisible={isVisible} />
  },

  renderList () {
    let { view } = this.props
    let isVisible = view === LIST
    return <ListComponent
      isVisible={isVisible} />
  },

  render () {
    let { view } = this.props
    return (
      <div className={classes.regionContainer}>
        {this.renderMap()}
        {this.renderList()}
        {view === LIST && this.props.children}
      </div>

    )
  }
})
export default RegionLayout
