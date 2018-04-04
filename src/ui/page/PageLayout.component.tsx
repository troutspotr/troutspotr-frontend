import * as React from 'react'
import { IPageLayoutProps } from './IPageLayout'
const styles = require('./PageLayout.scss')

export class PageLayoutComponent extends React.Component<IPageLayoutProps> {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(event) {
    const { resetMinimap, isExpanded } = this.props

    if (isExpanded === false || resetMinimap == null) {
      return
    }

    resetMinimap()
  }
  render() {
    const { header, content, footer, theme, isExpanded } = this.props
    const clickHandler = isExpanded ? this.handleClick : null
    const contentClassName = isExpanded ? styles.contentBlurred : styles.content
    const themeClass = theme === 'dark' || theme == null ? 'ts-dark' : 'ts-light'
    return (
      <div className={`${styles.viewport} ${themeClass}`}>
        <header className={styles.header}>{header}</header>
        <section className={contentClassName} onClick={clickHandler}>
          {content}
        </section>
        <footer className={styles.footer}>{footer}</footer>
      </div>
    )
  }
}
