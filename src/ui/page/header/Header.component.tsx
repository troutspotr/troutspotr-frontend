import * as React from 'react'
import ClipboardButton from 'react-clipboard.js'
import { ClipboardIcon } from 'ui/page/header/title/clipboard/ClipboardIcon.component'
import BackButtonContainer from './backButton/BackButton.container'
import { HeaderLayout } from './Header.layout'
import MinimapContainer from './minimap/Minimap.container'
import SearchContainer from './search/Search.container'
import { SubtitleComponent } from './subtitle/Subtitle.component'
import TitleComponent from './title/Title.component'

export interface IHeaderComponentPrps {
  subtitle: string
  title: string
  isTitleVisible: boolean
  isSearchVisible: boolean
  isIconVisible: boolean
  params: {}
  location: {}
  isOffline: boolean
  onCopyToClipboard: {}
}

export class HeaderComponent extends React.PureComponent<IHeaderComponentPrps> {
  public renderMinimap() {
    return <MinimapContainer params={this.props.params} location={this.props.location} />
  }

  public renderSearch() {
    if (this.props.isSearchVisible) {
      return <SearchContainer />
    }

    return null
  }

  public renderLocationSubtitle() {
    return <SubtitleComponent subtitle={this.props.subtitle} />
  }

  public renderTitle() {
    if (this.props.isTitleVisible === false) {
      return null
    }

    const body = <TitleComponent title={this.props.title} />

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
      />
    )
  }
}

export default HeaderComponent
