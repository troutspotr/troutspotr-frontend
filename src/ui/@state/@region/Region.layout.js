import React, { PropTypes } from 'react'
import classes from './Region.scss'
import { MAP, LIST } from 'ui/core/Core.state'
import MapComponent from './map/Map.component'
import ListComponent from './list/StreamList.component'
console.log(MAP, LIST)
const RegionLayout = React.createClass({
  propTypes: {
    view: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
  },

  renderMap () {
    return <MapComponent>map</MapComponent>
  },

  renderList () {
    return <ListComponent>list</ListComponent>
  },

  render () {
    let { view } = this.props

    return (
      <div>
        <div>THIS IS LAYOUT</div>
        {view === MAP && this.renderMap()}
        {view === LIST && this.renderList()}

        {this.props.children}
      </div>

    )
  }
})
export default RegionLayout
