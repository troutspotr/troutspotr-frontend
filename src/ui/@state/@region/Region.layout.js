import React, { PropTypes } from 'react'
import classes from './Region.scss'
import { MAP, LIST } from 'ui/core/Core.state'
import MapContainer from './map/Map.container'
import CountyListContainer from './list/CountyList.container'
import LoadingComponent from 'ui/core/loading/Loading.component'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
import { isEmpty } from 'lodash'
import SvgSpriteSheet from './svgSpriteSheet/SvgSpriteSheet.component'
const RegionLayout = React.createClass({
  propTypes: {
    view: PropTypes.string.isRequired,
    children: PropTypes.element,
    fetchRegionData: PropTypes.func.isRequired,
    selectedState: PropTypes.string.isRequired,
    selectedRegion: PropTypes.string.isRequired,
    regionLoadingStatus: PropTypes.string.isRequired,
    selectedStream: PropTypes.object,
    clearText: PropTypes.func.isRequired,
    streams: PropTypes.object,
    hasAgreedToTerms: PropTypes.bool.isRequired,
    showNoResultsFoundOverlay: PropTypes.bool.isRequired
  },

  componentDidMount () {
    let { fetchRegionData, selectedState, selectedRegion } = this.props
    fetchRegionData(selectedState, selectedRegion)
  },

  componentWillReceiveProps (nextProps) {
    let { selectedState, selectedRegion } = nextProps
    let nextCombo = (selectedState + selectedRegion).toLowerCase()
    let currentCombo = (this.props.selectedState + this.props.selectedRegion).toLowerCase()

    if (nextCombo !== currentCombo) {
      console.log('props changed, loading next region')
      this.props.fetchRegionData(selectedState, selectedRegion)
    }
  },

  renderLoading () {
    if (this.props.regionLoadingStatus === LOADING_CONSTANTS.IS_PENDING) {
      return (<LoadingComponent subTitle={'Loading New Region'} />)
    }

    return null
  },

  renderMap () {
    let { view } = this.props
    let isVisible = view === MAP
    return <MapContainer
      isVisible={isVisible} />
  },

  renderList () {
    let { view, selectedStream } = this.props
    let isVisible = view === LIST && isEmpty(selectedStream)
    return <CountyListContainer
      isVisible={isVisible} />
  },

  render () {
    let { view, hasAgreedToTerms } = this.props
    if (hasAgreedToTerms === false) {
      return null
    }

    return (
      <div className={classes.regionContainer}>
        <SvgSpriteSheet />
        {this.renderList()}
        {this.renderMap()}
        {view === LIST && this.props.children}
        {this.renderLoading()}
      </div>
    )
  }
})
export default RegionLayout
