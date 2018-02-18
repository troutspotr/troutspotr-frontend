import * as React from 'react'
const classes = require('./Region.scss')
// import { LIST, MAP } from 'ui/core/Core.redux'
// import MapContainer from './map/Map.container'
// import CountyListContainer from './list/CountyList.container'
import { LoadingComponent } from 'ui/core/loading/Loading.component'
import { LOADING_CONSTANTS } from 'ui/core/LoadingConstants'
// import { isEmpty } from 'lodash'
// import SvgSpriteSheet from './svgSpriteSheet/SvgSpriteSheet.component'
class RegionLayout extends React.Component<any> {
  componentDidMount() {
    const { fetchRegionData, selectedState, selectedRegion } = this.props
    fetchRegionData(selectedState, selectedRegion)
  }

  componentWillReceiveProps(nextProps) {
    const { selectedState, selectedRegion } = nextProps
    const nextCombo = (selectedState + selectedRegion).toLowerCase()
    const currentCombo = (this.props.selectedState + this.props.selectedRegion).toLowerCase()

    if (nextCombo !== currentCombo) {
      this.props.fetchRegionData(selectedState, selectedRegion)
    }
  }

  renderLoading() {
    if (this.props.regionLoadingStatus === LOADING_CONSTANTS.IS_PENDING) {
      return <LoadingComponent title="" subTitle={'Loading New Region'} />
    }

    return null
  }

  renderMap() {
    // const { view } = this.props
    // const isVisible = view === MAP
    // return <MapContainer isVisible={isVisible} />
    return null
  }

  renderList() {
    // const { view, selectedStream } = this.props
    // const isVisible = view === LIST && isEmpty(selectedStream)
    // return <CountyListContainer isVisible={isVisible} />
    return null
  }

  render() {
    const {
      // view,
      hasAgreedToTerms,
    } = this.props
    if (hasAgreedToTerms === false) {
      return null
    }

    return (
      <div className={classes.regionContainer}>
        {this.renderLoading()}
        {this.renderList()}
        {this.renderMap()}
        {/* {view === LIST && this.props.children} */}
      </div>
    )
  }
}

// RegionLayout.propTypes = {
//   'view': PropTypes.string.isRequired,
//   'children': PropTypes.element,
//   'fetchRegionData': PropTypes.func.isRequired,
//   'selectedState': PropTypes.string.isRequired,
//   'selectedRegion': PropTypes.string.isRequired,
//   'regionLoadingStatus': PropTypes.string.isRequired,
//   'selectedStream': PropTypes.object,
//   'hasAgreedToTerms': PropTypes.bool.isRequired,
// }

export default RegionLayout
