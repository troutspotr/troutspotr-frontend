import { connect } from 'react-redux'
import { isOfflineSelector } from 'ui/core/offline/Offline.selectors'
import { subtitleSelector } from 'ui/page/header/subtitle/Subtitle.selectors'
import { HeaderComponent } from './Header.component'
import { isSearchVisibleSelector } from './search/Search.selectors'
import {
  isSearchIconVisibleSelector,
  isTitleVisibleSelector,
  titleSelector,
} from './title/Title.selectors'

const mapDispatchToProps = {
  // OnCopyToClipboard: () => { AnonymousAnalyzerApi.recordEvent('copy_to_clipboard', {}) }
}

const mapStateToProps = state => ({
  subtitle: subtitleSelector(state),
  title: titleSelector(state),
  isTitleVisible: isTitleVisibleSelector(state),
  isSearchVisible: isSearchVisibleSelector(state),
  isIconVisible: isSearchIconVisibleSelector(state),
  isOffline: isOfflineSelector(state),
  onCopyToClipboard: () => {
    // AnonymousAnalyzerApi.recordEvent('copy_to_clipboard', {})
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
