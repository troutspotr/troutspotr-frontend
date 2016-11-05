import { connect } from 'react-redux'
import FooterComponent from './Footer.component'
const mapDispatchToProps = {
  // saveProfile: (companyId, profileId, profile) => saveBuilderProfile(companyId, profileId, profile),
  // loadCompany: (companyId) => fetchCompany(companyId)
}

const mapStateToProps = (state) => {
  return {
    // subtitle: subtitleSelector(state),
    // title: titleSelector(state),
    // isTitleVisible: isTitleVisibleSelector(state),
    // isSearchVisible: isSearchVisibleSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterComponent)
