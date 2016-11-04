import { connect } from 'react-redux'
import HeaderComponent from './Header.component'
import { titleSelector, isTitleVisibleSelector } from './title/Title.selectors'
import { subtitleSelector } from './subtitle/Subtitle.selectors'
import { isSearchVisibleSelector } from './search/Search.selectors'
// import { asdf, asdf } from './search/SearchSelector'
// console.log(HeaderComponent)
// import { saveBuilderProfile, fetchCompany } from './Profile.state'
// import { loadingStatusSelector, savingStatusSelector } from './Profile.selectors'
const mapDispatchToProps = {
  // saveProfile: (companyId, profileId, profile) => saveBuilderProfile(companyId, profileId, profile),
  // loadCompany: (companyId) => fetchCompany(companyId)
}

const mapStateToProps = (state) => {
  return {
    subtitle: subtitleSelector(state),
    title: titleSelector(state),
    isTitleVisible: isTitleVisibleSelector(state),
    isSearchVisible: isSearchVisibleSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
