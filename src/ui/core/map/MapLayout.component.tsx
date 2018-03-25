import * as React from 'react'
const styles = require('./MapLayout.scss')
import { MessageOverlayComponent } from 'ui/core/messageOverlay/MessageOverlay.component'

export interface IMapLayoutProps {
  readonly topOverlay: React.ReactNode | undefined
  readonly bottomOverlay: React.ReactNode | undefined
  readonly map: React.ReactNode
  readonly middleOverlay: React.ReactNode | undefined
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
  const top = makeOverlay('top', topOverlay)
  const bottom = makeOverlay('bottom', bottomOverlay)
  return (
    <div className={styles.container}>
      {top}
      {bottom}
      {map}
    </div>
  )
}