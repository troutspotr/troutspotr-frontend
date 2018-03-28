/* eslint-disable no-console */
import { boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { SwitchComponent, ISwitchomponentProps, ISwitchLabels } from './Switch.component'
const stories = storiesOf('Page/Footer/Switch', module)

const defaultProps: ISwitchomponentProps = {
  isSupported: boolean('supported', true),
  isLoading: boolean('loading', true),
  isSuccessful: boolean('isSuccessful', true),
  isFailed: boolean('Failed', false),
  startTracking: () => {
    console.log('startGpsTracking')
  },
  stopTracking: () => {
    console.log('stopGpsTracking')
  },
}

const labels = (prefix: string): ISwitchLabels => ({
  onText: text('On' + prefix, 'On'),
  waitText: text('Wait' + prefix, 'Wait'),
  failedText: text('Failed' + prefix, 'Fail'),
  offText: text('Off' + prefix, 'Off'),
  labelText: text('Label' + prefix, prefix),
})

stories.add('Switch control', () => {
  return (
    <SwitchComponent
      {...defaultProps}
      isLoading={boolean('Loading', false)}
      isSuccessful={boolean('Success', false)}
      isFailed={boolean('Failed', false)}
    />
  )
})

export const createSwitchProps = (labelText: string): ISwitchomponentProps => {
  const props = {
    ...defaultProps,
    labels: { ...labels(labelText) },
    isLoading: boolean('Loading' + labelText, false),
    isSuccessful: boolean('Success' + labelText, false),
    isFailed: boolean('Failed' + labelText, false),
  }

  return props
}

stories.add('custom labels control', () => {
  return (
    <SwitchComponent
      {...defaultProps}
      labels={labels('')}
      isLoading={boolean('Loading', false)}
      isSuccessful={boolean('Success', false)}
      isFailed={boolean('Failed', false)}
    />
  )
})
