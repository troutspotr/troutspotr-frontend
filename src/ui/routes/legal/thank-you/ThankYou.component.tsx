import * as React from 'react'
import { Link } from 'react-router'
export const ThankYouComponent = props => {
  return (
    <div>
      <h1>Thanks!</h1>
      <Link to={'/'}>Go to app or whatever</Link>
    </div>
  )
}
