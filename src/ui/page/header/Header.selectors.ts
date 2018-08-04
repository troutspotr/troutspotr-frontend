import { createStructuredSelector } from 'reselect'
import { IReduxState } from '../../redux/Store.redux.rootReducer'
import { isOfflineSelector } from '../offline/Offline.selectors'
import { IHeaderStateProps } from './Header.component'
import { isSearchVisibleSelector } from './search/Search.selectors'
import { subtitleSelector } from './subtitle/Subtitle.selectors'
import {
  isSearchIconVisibleSelector,
  isTitleVisibleSelector,
  titleSelector,
} from './title/Title.selectors'

export const headerStatePropsSelector = createStructuredSelector<IReduxState, IHeaderStateProps>({
  subtitle: subtitleSelector,
  title: titleSelector,
  isTitleVisible: isTitleVisibleSelector,
  isSearchVisible: isSearchVisibleSelector,
  isIconVisible: isSearchIconVisibleSelector,
  isOffline: isOfflineSelector,
})
