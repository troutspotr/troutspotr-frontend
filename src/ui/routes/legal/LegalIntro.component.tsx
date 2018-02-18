import * as React from 'react'
import { Link } from 'react-router'

export const LegalIntroComponent = props => {
  return (
    <div>
      <h1>Legal Intro here</h1>
      <Link to={'/legal/terms-of-service'}>Go to tos</Link>
    </div>
  )
}
