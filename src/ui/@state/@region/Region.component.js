import React, { PropTypes } from 'react'
const RegionComponent = React.createClass({
  propTypes: {
    children: PropTypes.element.isRequired,
    fetchRegionData: PropTypes.func.isRequired,
    selectedState: PropTypes.string.isRequired,
    selectedRegion: PropTypes.string.isRequired
  },

  componentDidMount () {
    let { fetchRegionData, selectedState, selectedRegion } = this.props
    fetchRegionData(selectedState, selectedRegion)
  },

  render () {
    return (
      // this.props.children
      null
    )
  }
})
export default RegionComponent
