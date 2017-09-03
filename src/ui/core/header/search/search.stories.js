import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import SearchComponent from 'ui/core/header/search/Search.component';

storiesOf('core/header/search', module)
    .add('without text', () => (
      <SearchComponent 
        updateSearchText={() => {}}
        searchText='' />
    ))
    .add('with text lol', () => (
      <SearchComponent 
        updateSearchText={() => {}}
        searchText='hiya' />
    ))
