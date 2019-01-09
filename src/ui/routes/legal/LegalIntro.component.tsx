import * as React from 'react'
import { Link } from 'react-router'

export interface ILegalIntroStateProps {
  foo: boolean,
}

export interface ILegalIntroDispatchProps {
  advance(): void
}

export interface ILegalIntroPassedProps {}

export interface ILegalIntroComponentProps
  extends ILegalIntroStateProps,
    ILegalIntroDispatchProps,
    ILegalIntroPassedProps {}
export class LegalIntroComponent extends React.PureComponent<ILegalIntroComponentProps> {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  public componentDidMount() {
    import(/* webpackChunkName: "legal" */ './Legal.imports')
  }
  private handleClick(e: any) {
    if (this.props.advance == null) {
      return
    }

    e.preventDefault()
    this.props.advance()
  }
  public render() {
    return (
      <div>
        <h1>Legal Intro here</h1>
        <Link onClick={this.handleClick} to={'/legal/terms-of-service'}>Go to tos</Link>
      </div>
    )
  }
}
