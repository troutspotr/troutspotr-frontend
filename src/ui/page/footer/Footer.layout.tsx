import * as React from 'react'
const classes = require('./Footer.scss')

export interface IFooterLayoutProps {
  view: React.ReactNode
  theme: React.ReactNode
  gps: React.ReactNode
}

export class FooterLayout extends React.PureComponent<IFooterLayoutProps> {
  public render() {
    // TODO: add view
    const { theme, gps } = this.props
    return (
      <div className={classes.footer}>
        <div className={classes.menu}>
          {theme}
          {gps}
        </div>
      </div>
    )
  }
}
