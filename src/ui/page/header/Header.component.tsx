import * as React from 'react'
import ClipboardButton from 'react-clipboard.js'
import { ClipboardIcon } from 'ui/page/header/title/clipboard/ClipboardIcon.component'
import BackButtonContainer from './backButton/BackButton.container'
import { HeaderLayout } from './Header.layout'
import { MinimapContainer } from './minimap/Minimap.container'
import SearchContainer from './search/Search.container'
import { SubtitleComponent } from './subtitle/Subtitle.component'
import TitleComponent from './title/Title.component'
import { SvgMinimapContainer } from './minimap/svgMinimap/SvgMinimap.container'
import { RouteComponentProps } from 'react-router'
export interface IHeaderStateDispatchProps {
  setIsExpanded(boolean): any
}

export interface IHeaderPassedProps {}

export interface IHeaderStateProps {
  subtitle: string
  title: string
  isTitleVisible: boolean
  isSearchVisible: boolean
  isIconVisible: boolean
  isOffline: boolean
  // isBackButtonVisible: boolean
}

export interface IHeaderComponentProps
  extends IHeaderPassedProps,
    IHeaderStateProps,
    IHeaderStateDispatchProps {}

export interface IHeaderComponentWithRouterProps
  extends IHeaderComponentProps,
    RouteComponentProps<{ fuck: string; yuck: number }, any> {}

export class HeaderComponent extends React.PureComponent<IHeaderComponentWithRouterProps> {
  constructor(props) {
    super(props)
  }

  public componentWillMount() {
    this.listenToRoutes()
  }

  listenToRoutes() {
    const { router } = this.props
    const farts = router as any
    farts.listen(({ pathname }) => {
      const isRoot = pathname == null || pathname === '/'
      if (isRoot) {
        this.props.setIsExpanded(true)
        return
      }

      setTimeout(() => this.props.setIsExpanded(false), 200)
    })
  }

  private renderMinimap() {
    const content = <SvgMinimapContainer />
    return <MinimapContainer mapComponent={content} />
  }

  private renderSearch() {
    return <SearchContainer />
  }

  private renderLocationSubtitle() {
    return <SubtitleComponent subtitle={this.props.subtitle} />
  }

  private doStuff() {
    return
  }

  private renderTitle() {
    if (this.props.isTitleVisible === false) {
      return null
    }

    const body = (
      <TitleComponent>
        <>{this.props.title}</>
      </TitleComponent>
    )

    const symbol = (
      <ClipboardIcon
        size={14}
        style={{ fill: 'hsla(199, 69%, 61%, 1)', color: 'hsla(199, 69%, 61%, 1)' }}
      />
    )
    return (
      <ClipboardButton
        onClick={this.doStuff}
        component="a"
        data-clipboard-text={window.location.href}
        button-title="Copy to clipboard"
      >
        <span>
          {body} {this.props.isIconVisible && symbol}
        </span>
      </ClipboardButton>
    )
  }

  private renderBackButton() {
    return <BackButtonContainer />
  }

  public render() {
    return (
      <HeaderLayout
        backButton={this.renderBackButton()}
        locationSubtitle={this.renderLocationSubtitle()}
        title={this.renderTitle()}
        minimap={this.renderMinimap()}
        search={this.renderSearch()}
        viewMode={'search'}
      />
    )
  }
}

export default HeaderComponent
