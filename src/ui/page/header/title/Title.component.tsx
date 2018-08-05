import * as React from 'react'
const classes = require('./Title.scss')

export interface ITitleProps {
  children?: JSX.Element
}
export class TitleComponent extends React.PureComponent<ITitleProps> {
  public render() {
    const { children } = this.props
    return <h3 className={classes.container}>{children}</h3>
  }
}

export default TitleComponent
