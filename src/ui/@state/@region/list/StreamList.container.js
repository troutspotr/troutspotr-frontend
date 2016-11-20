import { connect } from 'react-redux'
import StreamListComponent from './StreamList.component'
import { selectedStateIdSelector, selectedRegionIdSelector } from 'ui/core/Core.selectors'
import { visibleTroutStreams } from '../Region.selectors'
// import { saveBuilderProfile, fetchCompany } from './Profile.state'
// import { loadingStatusSelector, savingStatusSelector } from './Profile.selectors'
const mapDispatchToProps = {
  // saveProfile: (companyId, profileId, profile) => saveBuilderProfile(companyId, profileId, profile),
  // loadCompany: (companyId) => fetchCompany(companyId)
}

const mapStateToProps = (state) => {
  let props = {
    visibleTroutStreams: visibleTroutStreams(state),
    selectedState: selectedStateIdSelector(state),
    selectedRegion: selectedRegionIdSelector(state)
  }

  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamListComponent)
