import * as React from 'react'
import BackButtonContainer from './backButton/BackButton.container'
import SearchContainer from './search/Search.container'
import MinimapContainer from './minimap/Minimap.container'
import { HeaderLayout } from './Header.layout'
import TitleComponent from './title/Title.component'
import { SubtitleComponent } from './subtitle/Subtitle.component'
import ClipboardButton from 'react-clipboard.js'
import ClipboardIconComponent from 'ui/core/clipboard/ClipboardIcon.component'

export interface IHeaderComponent {
  subtitle: string
  title: string
  isTitleVisible: boolean
  isSearchVisible: boolean
  isIconVisible: boolean
  params: any
  location: any
  isOffline: boolean
  onCopyToClipboard: any
}

export class HeaderComponent extends React.PureComponent {
  renderMinimap() {
    return <MinimapContainer params={this.props.params} location={this.props.location} />
  }

  renderSearch() {
    if (this.props.isSearchVisible) {
      return <SearchContainer />
    }

    return null
  }

  renderLocationSubtitle() {
    return <SubtitleComponent subtitle={this.props.subtitle} />
  }

  renderTitle() {
    if (this.props.isTitleVisible === false) {
      return null
    }

    const body = <TitleComponent title={this.props.title} isVisible={this.props.isTitleVisible} />

    const symbol = (
      <ClipboardIconComponent
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

  renderBackButton() {
    return <BackButtonContainer previous={'/'} isEnabled={false} />
  }

  render() {
    return (
      <HeaderLayout
        backButton={this.renderBackButton()}
        locationSubtitle={this.renderLocationSubtitle()}
        title={this.renderTitle()}
        isOffline={this.props.isOffline}
        minimap={this.renderMinimap()}
        search={this.renderSearch()}
      />
    )
  }
}

export default HeaderComponent
