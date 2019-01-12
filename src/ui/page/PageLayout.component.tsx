import * as React from 'react'
import { IPageLayoutProps } from './IPageLayout'
const styles = require('./PageLayout.scss')
export class PageLayoutComponent extends React.Component<IPageLayoutProps> {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  private handleClick(event) {
    const { resetMinimap, isExpanded } = this.props

    if (isExpanded === false || resetMinimap == null) {
      return
    }

    resetMinimap()
  }
  public render() {
    const { header, content, footer, theme, isExpanded, legend, termsOfService } = this.props
    const clickHandler = isExpanded ? this.handleClick : null
    const contentClassName = isExpanded ? styles.contentBlurred : styles.content
    const themeClass = theme === 'dark' || theme == null ? 'ts-dark' : 'ts-light'
    return (
      <div className={`${styles.viewport} ${themeClass}`}>
        <header className={styles.header}>{header}</header>
        <section className={contentClassName} onClick={clickHandler}>
          {content}
        </section>
        {legend}
        {termsOfService}
        <footer className={styles.footer}>{footer}</footer>
      </div>
    )
  }
}
