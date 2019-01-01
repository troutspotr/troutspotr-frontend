import * as React from 'react'
const classes = require('./StreamItem.layout.scss')
import { Link } from 'react-router'
export interface IStreamItemLayoutProps {
  title: React.ReactNode
  micromap: React.ReactNode
  body: React.ReactNode
  link: string
  isVisible: boolean
}

export class StreamItemLayout extends React.Component<IStreamItemLayoutProps> {
  public render(): React.ReactNode {
    const { title, micromap, body, link, isVisible } = this.props
    const containerClass = isVisible ? classes.container : classes.invisible
    return (
      <Link to={link} className={containerClass}>
        <div className={classes.media}>{micromap}</div>
        <div className={classes.body}>
          <h4 className={classes.header}>{title}</h4>
          <div>{body}</div>
        </div>
      </Link>
    )
  }
}
