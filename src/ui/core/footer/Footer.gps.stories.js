import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import GpsComponent from './Footer.gps.component'
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs'

const stories = storiesOf('core/footer/footer.gps', module)
stories.addDecorator(withKnobs)


const label = 'Status';
const options = {
  loading: 'Loading',
  success: 'Success',
  failure: 'Failure',
}

const defaultProps = {
  isGpsTrackingSupported: true,
  isGpsActiveButLoading: false,
  isGpsActiveAndSuccessful: false,
  startGpsTracking: () => { console.log('startGpsTracking') },
  stopGpsTracking: () => { console.log('stopGpsTracking') },
  isGpsFailed: false,
}

stories.add('GPS control', () => {
    return (<GpsComponent
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

    return (<GpsComponent
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

    return (<GpsComponent
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

    return (<GpsComponent
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

    return (<GpsComponent
      {...props}
      isGpsActiveButLoading={boolean('Loading', false)}
      isGpsActiveAndSuccessful={boolean('Success', false)}
      isGpsFailed={boolean('Failed', true)}
    />
    )
  })



// isGpsTrackingSupported
// isGpsActiveButLoading
// isGpsActiveAndSuccessful
// startGpsTracking
// stopGpsTracking
// isGpsFailed
