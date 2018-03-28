import * as React from 'react'
const styles = require('./PageLayout.scss')

export interface IPageLayoutDispatchProps {
  fetchTableOfContents?(): void
  resetMinimap(): void
}

export interface IPageLayoutStateProps {
  readonly theme: 'dark' | 'light'
  readonly isExpanded: boolean
}

export interface IPageLayoutProps extends IPageLayoutDispatchProps, IPageLayoutStateProps {
  readonly header: React.ReactNode
  readonly content: React.ReactNode
  readonly footer: React.ReactNode
  readonly theme: 'dark' | 'light'
}

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
