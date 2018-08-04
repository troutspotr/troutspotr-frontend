import * as React from 'react'
const classes = require('./MessageOverlay.scss')

export interface IMessageOverlayDispatchProps {

}

export interface IMessageOverlayStateProps {
  position: 'top' | 'bottom'
}

export interface IMessageOverlayPassedProps {

}

export interface IMessageOverlayProps extends IMessageOverlayDispatchProps, IMessageOverlayStateProps, IMessageOverlayPassedProps {
}

export const MessageOverlayComponent: React.SFC<IMessageOverlayProps> = (props): JSX.Element => {
  const { position, children } = props
  const className = classes[position]
  return <div className={className}>{children}</div>
}
