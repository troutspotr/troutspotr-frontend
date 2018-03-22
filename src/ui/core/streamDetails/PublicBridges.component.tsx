import * as React from 'react'
const classes = require('./PublicBridges.scss')
import * as Badge from 'ui/core/badge/Badge.component'

interface IPublicBridgesComponent {
  count: number
}

const PublicBridgesComponent: React.SFC<IPublicBridgesComponent> = (props): JSX.Element => {
  const { count } = props
  const noun = count === 1 ? ' bridge' : ' bridges'
  const countSymbol =
    count === 0 ? (
      'No'
    ) : (
      <Badge.BadgeComponent
        badgeColor={Badge.Color.publiclyFishable}
        fillType={Badge.Fill.hollow}
        content={count}
      />
    )
  return (
    <div>
      <span className={classes.text}>
        {countSymbol} {noun} over publically fishable land.
      </span>
    </div>
  )
}

export { PublicBridgesComponent }
