import * as React from 'react'
import { Link } from 'react-router'

export const CreditsComponent = props => {
  return (
    <div>
      <h1>Credits body here</h1>
      <Link to={'/legal/thank-you'}>Go to Thank you</Link>
    </div>
  )
}
