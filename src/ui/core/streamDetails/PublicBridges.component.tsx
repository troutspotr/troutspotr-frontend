import * as React from 'react'
import * as Badge from '../badge/Badge.component'

export interface IPublicBridgesComponent {
  count: number
}

export const PublicBridgesComponent: React.SFC<IPublicBridgesComponent> = (props): JSX.Element => {
  const { count } = props
  const noun = count === 1 ? ' bridge' : ' bridges'
  const countSymbol =
    count === 0 ? (
      'No'
    ) : (
      <Badge.BadgeComponent
        badgeColor={Badge.Color.publiclyFishable}
        fillType={Badge.Fill.solid}
        content={count}
      />
    )
  return (
    <React.Fragment>
      {countSymbol} {noun} over publically fishable land.
    </React.Fragment>
  )
}
