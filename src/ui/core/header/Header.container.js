import { connect } from 'react-redux'
import HeaderComponent from './Header.component'
import { titleSelector, isTitleVisibleSelector } from './title/Title.selectors'
import { subtitleSelector } from './subtitle/Subtitle.selectors'
import { isSearchVisibleSelector } from './search/Search.selectors'
const mapDispatchToProps = {
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
