import { storiesOf } from '@storybook/react'
import * as React from 'react'
const styles = require('./MapLayout.stories.scss')
import { boolean } from '@storybook/addon-knobs'
import { IMapLayoutProps, MapLayoutComponent } from './MapLayout.component'
const stories = storiesOf('Core/MapLayout', module)
stories.add('Page', () => {
  const topOverlay = boolean('Show Top Overlay', true) ? 'top overlay' : null
  const bottomOverlay = boolean('Show Bottom Overlay', true) ? 'bottom overlay' : null
  const map = (
    <div className={styles.fullscreenContainer}>
      <div>map</div>
      <div>map</div>
      <div>map</div>
    </div>
  )

  const props: IMapLayoutProps = {
    topOverlay,
    bottomOverlay,
    map,
    middleOverlay: null,
  }
  const mapLayout = <MapLayoutComponent {...props} />
  const fakePageLayout = <div className={styles.fakeContainer}>{mapLayout}</div>
  return fakePageLayout
})
