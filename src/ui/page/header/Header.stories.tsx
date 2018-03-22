import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { HeaderLayout, IHeaderLayout } from './Header.layout'
import { BackButtonComponent, IBackButton } from './backButton/BackButton.component'
import { SearchComponent, ISearchProps } from './search/Search.component'
import { text, select } from '@storybook/addon-knobs'

const stories = storiesOf('Page/Header', module)
stories.add('Layout', () => {
  const viewMode = select('mode', { search: 'search', summary: 'summary' }, 'search')
  const props: IHeaderLayout = {
    backButton: <div>hello</div>,
    locationSubtitle: <span>subtitle</span>,
    title: <span>title</span>,
    minimap: <span>map</span>,
    search: <span>search</span>,
    viewMode: viewMode,
  }

  return <HeaderLayout {...props} />
})

stories.add('Components', () => {
  const viewModeValue = select('mode', { search: 'search', summary: 'summary' }, 'search')
  const backButtonProps: IBackButton = {
    previous: '#',
    isEnabled: true,
  }
  const searchText = text('search', '')
  const titleText = text('stream title', 'Something something Creek')
  const subTitleText = text('subtitle', 'Such and Such, MN')
  const searchProps: ISearchProps = {
    updateSearchText: (text: string) => {},
    searchText: searchText,
  }
  const props: IHeaderLayout = {
    backButton: <BackButtonComponent {...backButtonProps} />,
    locationSubtitle: <>{subTitleText}</>,
    title: <>{titleText}</>,
    minimap: <span>map</span>,
    search: <SearchComponent {...searchProps} />,
    viewMode: viewModeValue,
  }

  return <HeaderLayout {...props} />
})
