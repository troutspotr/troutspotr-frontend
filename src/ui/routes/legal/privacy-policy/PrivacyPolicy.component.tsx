import * as React from 'react'
import { Link } from 'react-router'

export const PrivacyPolicyComponent = props => {
  return (
    <div>
      <h1>Privacy Policy</h1>
      <Link to={'/legal/thank-you'}>Go to Thank you</Link>
    </div>
  )
}
