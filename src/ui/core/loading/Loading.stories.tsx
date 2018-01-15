import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { LoadingComponent } from './Loading.component'

const stories = storiesOf('Loading', module)

stories.add('with normal text', () => {
  return <LoadingComponent title={'title goes here'} subTitle="subtitle" />
})

stories.add('with long-ass text', () => {
  return (
    <LoadingComponent
      title={'really really long title that just keeps going forever and ever'}
      subTitle="i simply do not understand why people continue to make fun of how long this subtitle is. such events first occured in the summer of 1992 in Ms Browsersteins first grade class when i"
    />
  )
})
