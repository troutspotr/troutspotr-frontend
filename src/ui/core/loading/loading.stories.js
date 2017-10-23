import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import LoadingComponent from 'ui/core/loading/Loading.component'

storiesOf('core/loading', module)
  .add('with normal text', () => (
    <LoadingComponent
      title={'title goes here'}
      subTitle='subtitle' />
  ))
  .add('with long-ass text', () => (
    <LoadingComponent
      title={'really really long title that just keeps going forever and ever'}
      subTitle='i simply do not understand why people continue to make fun of how long this subtitle is. such events first occured in the summer of 1992 in Ms Browsersteins first grade class when i' />
  ))
