import { createStructuredSelector } from 'reselect'
import { IHeaderStateProps } from './Header.component'
import { isOfflineSelector } from '../offline/Offline.selectors'
import {
  titleSelector,
  isTitleVisibleSelector,
  isSearchIconVisibleSelector,
} from './title/Title.selectors'
import { subtitleSelector } from './subtitle/Subtitle.selectors'
import { isSearchVisibleSelector } from './search/Search.selectors'
import { IReduxState } from '../../redux/Store.redux.rootReducer'

export const headerStatePropsSelector = createStructuredSelector<IReduxState, IHeaderStateProps>({
  subtitle: subtitleSelector,
  title: titleSelector,
  isTitleVisible: isTitleVisibleSelector,
  isSearchVisible: isSearchVisibleSelector,
  isIconVisible: isSearchIconVisibleSelector,
  isOffline: isOfflineSelector,
})
