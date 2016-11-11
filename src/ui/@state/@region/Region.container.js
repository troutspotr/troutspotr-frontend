import { connect } from 'react-redux'
import RegionLayout from './Region.layout'
import { viewSelector } from 'ui/core/Core.selectors'
// import { saveBuilderProfile, fetchCompany } from './Profile.state'
// import { loadingStatusSelector, savingStatusSelector } from './Profile.selectors'
const mapDispatchToProps = {
  // saveProfile: (companyId, profileId, profile) => saveBuilderProfile(companyId, profileId, profile),
  // loadCompany: (companyId) => fetchCompany(companyId)
}

const mapStateToProps = (state) => {
  return {
    view: viewSelector(state)
    // loadingStatus: loadingStatusSelector(state),
    // savingStatus: savingStatusSelector(state),
    // currentFormProfile: formDataSelector(state),
    // currentCompany: companySelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionLayout)
