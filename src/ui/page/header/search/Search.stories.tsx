import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { SearchComponent, IBackButtonProps } from './Search.component'
import { action } from '@storybook/addon-actions'

const stories = storiesOf('Page/Header/Search', module)
stories.add('Empty Search', () => {
  const props: IBackButtonProps = {
    searchText: '',
    updateSearchText: action('update-search'),
  }

  return <SearchComponent {...props} />
})
