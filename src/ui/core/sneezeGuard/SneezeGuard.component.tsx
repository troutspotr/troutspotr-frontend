import * as React from 'react'
const classes = require('./SneezeGuard.scss')

export interface ISneezeguardProps {
  close: any
}
export class SneezeGuardComponent extends React.Component<ISneezeguardProps> {
  onClick = () => {
    if (this.props.close) {
      this.props.close()
    }
  }

  render() {
    return <span onClick={this.onClick} className={classes.sneezeGuard} />
  }
}
