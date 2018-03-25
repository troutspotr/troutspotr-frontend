import { connect } from 'react-redux'
import { subtitleSelector } from 'ui/page/header/subtitle/Subtitle.selectors'
import {
  HeaderComponent,
  IHeaderStateProps,
  IHeaderPassedProps,
  IHeaderStateDispatchProps,
} from './Header.component'
import { isSearchVisibleSelector } from './search/Search.selectors'
import { isOfflineSelector } from '../offline/Offline.selectors'
import {
  isSearchIconVisibleSelector,
  isTitleVisibleSelector,
  titleSelector,
} from './title/Title.selectors'

const mapDispatchToProps = {
  // OnCopyToClipboard: () => { AnonymousAnalyzerApi.recordEvent('copy_to_clipboard', {}) }
}

const mapStateToProps = (state): IHeaderStateProps => ({
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

export const HeaderContainer = connect<
  IHeaderStateProps,
  IHeaderStateDispatchProps,
  IHeaderPassedProps
>(mapStateToProps, mapDispatchToProps)(HeaderComponent)
