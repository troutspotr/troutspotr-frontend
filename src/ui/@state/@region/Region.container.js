import {connect} from 'react-redux'
import RegionLayout from './Region.layout'
import {fetchRegionData} from './Region.state'
import {regionLoadingStatusSelector,
  showNoResultsFoundSelector,
  streamsSelector,
  visibleTroutStreams} from './Region.selectors'
import {hasAgreedToTermsSelector,
  selectedRegionIdSelector,
  selectedStateIdSelector, viewSelector} from 'ui/core/Core.selectors'
import {updateSearchText} from 'ui/core/Core.state'

const mapDispatchToProps = {
  'fetchRegionData': (stateId, regionId) => fetchRegionData(stateId, regionId),
  'clearText': () => updateSearchText(''),
}

const mapStateToProps = (state) => {
  const props = {
    'view': viewSelector(state),
    'troutStreams': visibleTroutStreams(state),
    'selectedState': selectedStateIdSelector(state),
    'selectedRegion': selectedRegionIdSelector(state),
    'regionLoadingStatus': regionLoadingStatusSelector(state),
    'streams': streamsSelector(state),
    'showNoResultsFoundOverlay': showNoResultsFoundSelector(state),
    'hasAgreedToTerms': hasAgreedToTermsSelector(state),
  }

  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionLayout)
