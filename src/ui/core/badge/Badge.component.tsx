import * as React from 'react'
const classes = require('./Badge.scss')

export enum Color {
  publiclyFishable = 'green',
  privatelyFishable = 'blue',
  unsafeToFish = 'blueGray',
  warning = 'yellow',
  alert = 'red',
}

export enum Fill {
  solid = 'solid',
  hollow = 'hollow',
}

export interface IBadgeProps {
  readonly badgeColor: Color
  readonly fillType: Fill
  readonly content: string | number
}

export const BadgeComponent: React.SFC<IBadgeProps> = (props): JSX.Element => {
  const { content, badgeColor, fillType } = props
  const safeContent = content === '' ? ' ' : content
  // const isLong = safeContent.toString().length >= 2
  // const contentClassName = isLong ? classes.contentSmall : classes.content
  const key = `${badgeColor}${fillType === Fill.solid ? 'Solid' : ''}`
  const className = classes[key]
  return <span className={className}>{safeContent}</span>
}
