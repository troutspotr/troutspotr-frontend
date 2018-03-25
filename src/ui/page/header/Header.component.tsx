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
export interface IHeaderStateDispatchProps {}

export interface IHeaderPassedProps {}

export interface IHeaderStateProps {
  subtitle: string
  title: string
  isTitleVisible: boolean
  isSearchVisible: boolean
  isIconVisible: boolean
  isOffline: boolean
  onCopyToClipboard(): void
}

export interface IHeaderComponentProps
  extends IHeaderPassedProps,
    IHeaderStateProps,
    IHeaderStateDispatchProps {}

export class HeaderComponent extends React.PureComponent<IHeaderComponentProps> {
  public renderMinimap() {
    const content = <SvgMinimapContainer />
    return <MinimapContainer mapComponent={content} />
  }

  public renderSearch() {
    return <SearchContainer />
  }

  public renderLocationSubtitle() {
    return <SubtitleComponent subtitle={this.props.subtitle} />
  }

  public renderTitle() {
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
        onClick={this.props.onCopyToClipboard}
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

  public renderBackButton() {
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
