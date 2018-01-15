import * as React from 'react'
export interface ISubtitleProps {
  readonly subtitle: string
}
const SubtitleComponent: React.SFC<ISubtitleProps> = props => {
  return <span>{props.subtitle}</span>
}

export { SubtitleComponent }
