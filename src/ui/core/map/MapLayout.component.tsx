import * as React from 'react'
const styles = require('./MapLayout.scss')
import { MessageOverlayComponent } from 'ui/core/messageOverlay/MessageOverlay.component'

export interface IMapLayoutProps {
  readonly topOverlay: React.ReactNode | undefined
  readonly bottomOverlay: React.ReactNode | undefined
  readonly map: React.ReactNode
  readonly middleOverlay: React.ReactNode | undefined
}

export const MapLayoutComponent: React.SFC<IMapLayoutProps> = props => {
  const { topOverlay, bottomOverlay, map } = props
  return (
    <div className={styles.container}>
      {topOverlay && (
        <MessageOverlayComponent key="top" position={'top'}>
          {topOverlay}
        </MessageOverlayComponent>
      )}
      {bottomOverlay && (
        <MessageOverlayComponent key="bottom" position={'bottom'}>
          {bottomOverlay}
        </MessageOverlayComponent>
      )}
      {map}
    </div>
  )
}
