import * as React from 'react'
import { Link } from 'react-router'
import Button from './Button.component.js'

const classes = require('ui/routes/legal/Legal.scss')

export interface ILegalIntroStateProps {
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
    import(/* webpackChunkName: "legal" */ '../Legal.imports')
  }
  private handleClick(e: any) {
    if (this.props.advance == null) {
      return
    }

    e.preventDefault()
    this.props.advance()
  }

  public renderTitle () {
    return (<h1 className={classes.jumbo}>TroutSpotr</h1>)
  }

  public renderPreamble () {
    return (<div className={classes.equation}>
      <div>
        <span className={classes.blue}>Trout Streams</span>
      </div>
      <div>
        <span className={classes.plus}>+</span>
        <span className={classes.green}>Public Land</span>
      </div>
      <div>
        <span className={classes.plus}>+</span>
        <span>Public Roads</span>
      </div>
      <hr />
      <div>
        <span className={classes.white}>Safe & Legal Fishing</span>
      </div>
    </div>)
  }

  public renderAPP () {
    return (<div className={classes.APP}>
      <p>TroutSpotr is a tool that helps you make <span className={classes.public}>safe and legal choices</span> when fishing for trout.</p>
      <p>However, before you use it, you must <span className={classes.private}>understand and agree</span> to some ground rules first.</p>
    </div>)
  }

  public render() {
    return (
      <React.Fragment>
        {this.renderTitle()}
        {this.renderPreamble()}
        {this.renderAPP()}
        <button className={classes.button} onClick={this.handleClick}>Continue to Terms of Service</button>
        {/* <Link onClick={this.handleClick} to={'/legal/terms-of-service'}>Go to tos</Link> */}
      </React.Fragment>
    )
  }
}
