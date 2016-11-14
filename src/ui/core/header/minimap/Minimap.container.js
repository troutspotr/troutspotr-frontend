import { connect } from 'react-redux'
import MinimapComponent from './Minimap.component'
import { isExpaned } from './Minimap.state'
import { isExpandedSelector } from './Minimap.selectors'
import { withRouter } from 'react-router'
import { isRootPageSelector } from 'ui/Location.selectors'
import { fetchTableOfContents } from 'ui/Geo.state'
import * as geoSelectors from 'ui/Geo.selectors'
// import { loadingStatusSelector, savingStatusSelector } from './Profile.selectors'
const mapDispatchToProps = {
  expand: (expanded) => isExpaned(expanded),
  fetchTableOfContents: () => fetchTableOfContents()
}

const mapStateToProps = (state) => {
  let props = {
    isExpanded: isExpandedSelector(state),
    isRootPage: isRootPageSelector(state),
    statesGeoJson: geoSelectors.statesGeoJsonSelector(state),
    countiesGeoJson: geoSelectors.countiesGeoJsonSelector(state),
    regionsGeoJson: geoSelectors.regionsGeoJsonSelector(state),
    streamCentroidsGeoJson: geoSelectors.streamCentroidsGeoJsonSelector(state),
    tableOfContentsLoadingStatus: geoSelectors.tableOfContentsLoadingStatusSelector(state)
  }
  return props
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MinimapComponent))
