/* eslint-disable no-console */
import { boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { FooterGpsComponent as GpsComponent } from './Footer.gps.component'

const stories = storiesOf('Page/Footer/GPS', module)

const defaultProps = {
  isGpsTrackingSupported: true,
  isGpsActiveButLoading: false,
  isGpsActiveAndSuccessful: false,
  startGpsTracking: () => {
    console.log('startGpsTracking')
  },
  stopGpsTracking: () => {
    console.log('stopGpsTracking')
  },
  isGpsFailed: false,
}

stories
  .add('GPS control', () => {
    return (
      <GpsComponent
        {...defaultProps}
        isGpsActiveButLoading={boolean('Loading', false)}
        isGpsActiveAndSuccessful={boolean('Success', false)}
        isGpsFailed={boolean('Failed', false)}
      />
    )
  })
  .add('GPS not supported', () => {
    const props = {
      ...defaultProps,
      isGpsTrackingSupported: false,
    }

    return (
      <GpsComponent
        {...props}
        isGpsActiveButLoading={boolean('Loading', false)}
        isGpsActiveAndSuccessful={boolean('Success', false)}
        isGpsFailed={boolean('Failed', false)}
      />
    )
  })
  .add('GPS loading', () => {
    const props = {
      ...defaultProps,
      isGpsActiveButLoading: true,
    }

    return (
      <GpsComponent
        {...props}
        isGpsActiveButLoading={boolean('Loading', true)}
        isGpsActiveAndSuccessful={boolean('Success', false)}
        isGpsFailed={boolean('Failed', false)}
      />
    )
  })
  .add('GPS successful', () => {
    const props = {
      ...defaultProps,
      isGpsActiveAndSuccessful: true,
    }

    return (
      <GpsComponent
        {...props}
        isGpsActiveButLoading={boolean('Loading', false)}
        isGpsActiveAndSuccessful={boolean('Success', true)}
        isGpsFailed={boolean('Failed', false)}
      />
    )
  })
  .add('GPS failed', () => {
    const props = {
      ...defaultProps,
      isGpsFailed: true,
    }

    return (
      <GpsComponent
        {...props}
        isGpsActiveButLoading={boolean('Loading', false)}
        isGpsActiveAndSuccessful={boolean('Success', false)}
        isGpsFailed={boolean('Failed', true)}
      />
    )
  })
