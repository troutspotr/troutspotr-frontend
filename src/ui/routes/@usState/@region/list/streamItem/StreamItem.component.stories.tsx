import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { text } from '@storybook/addon-knobs'
import {
  StreamItemLayout,
  IStreamItemLayoutProps,
} from 'ui/routes/@usState/@region/list/streamItem/StreamItem.layout'
import { BadgeComponent, IBadgeProps, Color, Fill } from 'ui/core/badge/Badge.component'
import { IStreamObject } from 'coreTypes/IStreamObject'
const TroutRunCreek = require('ui/core/micromap/canvas/_stubs/trout-run-creek.json') as IStreamObject
import { StreamItemComponent, IStreamItemProps } from './StreamItem.component'
const kirby = require('ui/page/header/minimap/_stubs/kirby.gif')
const stories = storiesOf('StreamList/StreamItem', module)

stories.add('Stream Item Layout', () => {
  const fooValue = text('text', 'Diamond Creek, South Fork')
  const subText = text(
    'sub text',
    'Open until 4/14/2018. 2018 Winter Southeastern Minnesota regulations. Catch and Release Only.'
  )

  const badgeProps: IBadgeProps = {
    badgeColor: Color.publiclyFishable,
    fillType: Fill.solid,
    content: 4,
  }

  const badgeComponent = <BadgeComponent {...badgeProps} />
  const fakeBody = (
    <div>
      <span>{subText}</span>
      <div>{badgeComponent} bridges over publicly fishable land.</div>
    </div>
  )
  const fakeMicromap = <img src={kirby} style={{ width: '100%', height: '100%' }} />
  const props: IStreamItemLayoutProps = {
    title: fooValue,
    micromap: fakeMicromap,
    body: fakeBody,
    link: '#',
    isVisible: true,
  }
  return <StreamItemLayout {...props} />
})

stories.add('Stream Item Components', () => {
  const props: IStreamItemProps = {
    stream: TroutRunCreek,
    isVisible: true,
    url: '#',
  }
  return <StreamItemComponent {...props} />
})
