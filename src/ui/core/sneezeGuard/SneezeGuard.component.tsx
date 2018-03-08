import * as React from 'react'
const classes = require('./SneezeGuard.scss')

export interface ISneezeguardProps {
  close: {}
}
export class SneezeGuardComponent extends React.Component<ISneezeguardProps> {
  public onClick = () => {
    if (this.props.close) {
      this.props.close()
    }
  }

  public render() {
    return <span onClick={this.onClick} className={classes.sneezeGuard} />
  }
}
