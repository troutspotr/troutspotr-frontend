import * as React from 'react'
import { Link } from 'react-router'

export class LegalIntroComponent extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  public componentDidMount() {
    import(/* webpackChunkName: "legal" */ './Legal.imports')
  }
  public render() {
    return (
      <div>
        <h1>Legal Intro here</h1>
        <Link to={'/legal/terms-of-service'}>Go to tos</Link>
      </div>
    )
  }
}
