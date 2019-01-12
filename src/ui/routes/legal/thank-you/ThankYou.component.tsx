import * as React from 'react'
import { Link } from 'react-router'
const classes = require('ui/routes/legal/Legal.scss')
export interface IThankYouComponentProps {
  advance(): void,
}

export class ThankYouComponent extends React.PureComponent<IThankYouComponentProps> {
  constructor(props) {
    super(props)
  }

  private renderTitle () {
    return (
      <div className={classes.thanksContainer}>
        <div className={classes.thanks}>Thanks!</div>
        <div className={classes.fishing}>{"Let's go fishing!"}</div>
      </div>)
  }

  public componentDidMount() {
    setTimeout(() => {
      if (this.props.advance != null) {
        this.props.advance()
      }
    }, 2000)
  }
  private handleAdvance(e: any) {
    if (this.props.advance == null) {
      return
    }

    this.props.advance()
  }
  public render() {
    return this.renderTitle()
  }
}
