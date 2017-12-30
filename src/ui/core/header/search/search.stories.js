import React from 'react'
import { storiesOf } from '@kadira/storybook'
import SearchComponent from 'ui/core/header/search/Search.component'
import { withKnobs, text } from '@kadira/storybook-addon-knobs'

const stories = storiesOf('core/header/search', module)
stories.addDecorator(withKnobs)

stories.add('without text', () => (
  <SearchComponent
    updateSearchText={() => {}}
    searchText='' />
))
  .add('with text lol', () => (
    <SearchComponent
      updateSearchText={() => {}}
      searchText='hiya' />
  ))
  .add('with dynamic text', () => {
    return (
      <SearchComponent
        updateSearchText={() => {}}
        searchText={text('Search Text', 'Enter Text below')} />
    )
  })
