import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { ISearchProps, SearchComponent } from './Search.component'

const stories = storiesOf('Page/Header/Search', module)
stories.add('Empty Search', () => {
  const props: ISearchProps = {
    searchText: '',
    updateSearchText: action('update-search'),
  }

  return <SearchComponent {...props} />
})
