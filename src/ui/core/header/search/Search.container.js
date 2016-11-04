import { connect } from 'react-redux'
import SearchComponent from './Search.component'
// import { saveBuilderProfile, fetchCompany } from './Profile.state'
// import { loadingStatusSelector, savingStatusSelector } from './Profile.selectors'
const mapDispatchToProps = {
  // saveProfile: (companyId, profileId, profile) => saveBuilderProfile(companyId, profileId, profile),
  // loadCompany: (companyId) => fetchCompany(companyId)
}

const mapStateToProps = (state) => {
  return {
    // loadingStatus: loadingStatusSelector(state),
    // savingStatus: savingStatusSelector(state),
    // currentFormProfile: formDataSelector(state),
    // currentCompany: companySelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent)
