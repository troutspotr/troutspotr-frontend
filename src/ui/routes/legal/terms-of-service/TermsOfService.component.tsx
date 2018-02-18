import * as React from 'react'
import { Link } from 'react-router'

export const TermsOfServiceComponent = props => {
  return (
    <div>
      <h1>Terms of Service Policy</h1>
      <Link to={'/legal/privacy-policy'}>Go to PP</Link>
    </div>
  )
}
