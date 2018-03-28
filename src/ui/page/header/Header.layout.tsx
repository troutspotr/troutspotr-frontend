import * as React from 'react'
import TitleComponent from './title/Title.component'
import { CSSTransition } from 'react-transition-group'

const classes = require('./Header.scss')

const SEARCH = 'search'
const enterAnimationSpeed = parseInt(classes['enter-speed'])
const exitAnimationSpeed = parseInt(classes['exit-speed'])
const timeoutSettings = {
  enter: enterAnimationSpeed,
  exit: exitAnimationSpeed,
}
export interface IHeaderLayout {
  readonly backButton?: JSX.Element
  readonly locationSubtitle?: JSX.Element
  readonly title?: JSX.Element
  readonly minimap?: JSX.Element
  readonly search?: JSX.Element
  readonly viewMode: 'search' | 'summary'
}

export class HeaderLayout extends React.Component<IHeaderLayout> {
  renderBody() {
    const { title, search, viewMode } = this.props
    const isSearch = viewMode === SEARCH
    const asdf = (
      <CSSTransition
        timeout={timeoutSettings}
        classNames="whatever-"
        in={isSearch}
        unmountOnExit={true}
      >
        <div className={classes.thing} key="goodbye">
          {search}
        </div>
      </CSSTransition>
    )

    const ljkfdlkjsfd = (
      <CSSTransition
        timeout={timeoutSettings}
        classNames="hello-"
        in={!isSearch}
        unmountOnExit={true}
      >
        <div className={classes.thing} key="hello">
          <TitleComponent>{title}</TitleComponent>
        </div>
      </CSSTransition>
    )

    // return null
    return (
      <div>
        {asdf}
        {ljkfdlkjsfd}
      </div>
    )
  }
  render() {
    const { backButton, locationSubtitle, minimap } = this.props
    return (
      <div className={classes.headerContainer} role="navigation">
        <div className={classes.header}>
          <div className={classes.backButtonContainer}>{backButton}</div>
          <div className={classes.details}>
            <div className={classes.top}>
              <div>{locationSubtitle}</div>
            </div>
            <div className={classes.bottom}>{this.renderBody()}</div>
          </div>
          <div className={classes.minimapContainer}>{minimap}</div>
        </div>
      </div>
    )
  }
}
