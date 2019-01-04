import * as React from 'react'
const styles = require('./MapLayout.scss')
import { MessageOverlayComponent } from 'ui/core/messageOverlay/MessageOverlay.component'

export interface IMapLayoutProps {
  readonly topOverlay?: React.ReactNode
  readonly bottomOverlay?: React.ReactNode
  readonly map: React.ReactNode
  readonly middleOverlay?: React.ReactNode
}

const makeOverlay = (key: 'bottom' | 'top', overlay: React.ReactNode | undefined): JSX.Element => {
  if (overlay == null) {
    return null
  }

  return (
    <MessageOverlayComponent key={key} position={key}>
      {overlay}
    </MessageOverlayComponent>
  )
}

export const MapLayoutComponent: React.SFC<IMapLayoutProps> = (props): JSX.Element => {
  const { topOverlay, bottomOverlay, map } = props
  const topMessageOverlay = makeOverlay('top', topOverlay)
  const bottomMessageOverlay = makeOverlay('bottom', bottomOverlay)
  return (
    <div className={styles.container}>
      {/* order doesnt matter here, but we're just
      gonna have them go in cognitive order. */}
      {topMessageOverlay}
      {map}
      {bottomMessageOverlay}
    </div>
  )
}
