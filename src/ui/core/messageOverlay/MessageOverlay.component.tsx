import * as React from 'react'
const classes = require('./MessageOverlay.scss')

export interface IMessageOverlayProps {
  position: 'top' | 'bottom'
}

export const MessageOverlayComponent: React.SFC<IMessageOverlayProps> = (props): JSX.Element => {
  const { position, children } = props
  const className = classes[position]
  return <div className={className}>{children}</div>
}
