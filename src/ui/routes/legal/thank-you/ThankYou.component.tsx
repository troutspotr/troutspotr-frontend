import * as React from 'react'
import { Link } from 'react-router'

export interface IThankYouComponentProps {
  advance(): void,
}

export class ThankYouComponent extends React.PureComponent<IThankYouComponentProps> {
  constructor(props) {
    super(props)
  }

  public componentDidMount() {
    setTimeout(() => {
      if (this.props.advance != null) {
        debugger
        this.props.advance()
      }
    }, 1500)
  }
  private handleAdvance(e: any) {
    if (this.props.advance == null) {
      return
    }

    this.props.advance()
  }
  public render() {
    
    return (
      <div>
        <h1>Thanks!</h1>
        <Link onClick={this.handleAdvance} to={'/'}>Go to app or whatever</Link>
      </div>
    )
  }
}

// export const ThankYouComponent = props => {
//   return (
//     <div>
//       <h1>Thanks!</h1>
//       <Link to={'/'}>Go to app or whatever</Link>
//     </div>
//   )
// }
