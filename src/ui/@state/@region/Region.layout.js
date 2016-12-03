import React, { PropTypes } from 'react'
import classes from './Region.scss'
import { MAP, LIST } from 'ui/core/Core.state'
import MapContainer from './map/Map.container'
import ListComponent from './list/StreamList.container'
import LoadingComponent from 'ui/core/loading/Loading.component'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
import MessageOverlay from 'ui/core/messageOverlay/MessageOverlay.component'
import { isEmpty } from 'lodash'
import SvgSpriteSheet from './svgSpriteSheet/SvgSpriteSheet.component'
// console.log(MAP, LIST)
const RegionLayout = React.createClass({
  propTypes: {
    view: PropTypes.string.isRequired,
    children: PropTypes.element,
    fetchRegionData: PropTypes.func.isRequired,
    selectedState: PropTypes.string.isRequired,
    selectedRegion: PropTypes.string.isRequired,
    regionLoadingStatus: PropTypes.string.isRequired,
    troutStreams: PropTypes.array,
    // searchText: PropTypes.string.isRequired,
    clearText: PropTypes.func.isRequired,
    streams: PropTypes.object,
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

  renderNoElementsFoundInRegionOverlay () {
    let { showNoResultsFoundOverlay, streams } = this.props
    if (showNoResultsFoundOverlay === false) {
      return null
    }

    let safeStreamCount = isEmpty(streams) ? 0 : streams.features.length
    return (
      <MessageOverlay
        position='top' >
        <div>
          <div className={classes.clearSearchTitle}>No streams matched your search.</div>
          <div>
            <button onClick={this.props.clearText} className={classes.actionButton}>Clear your search</button> to see {safeStreamCount} streams.
          </div>
        </div>
      </MessageOverlay>)
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
        <SvgSpriteSheet />
        {this.renderList()}
        {this.renderMap()}
        {view === LIST && this.props.children}
        {this.renderLoading()}
        {this.renderNoElementsFoundInRegionOverlay()}
      </div>

    )
  }
})
export default RegionLayout
