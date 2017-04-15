import React, { PropTypes, Component } from 'react'
import BackButtonContainer from './backButton/BackButton.container'
import SearchContainer from './search/Search.container'
import MinimapContainer from './minimap/Minimap.container'
import HeaderLayout from './Header.layout'
import TitleComponent from './title/Title.component'
import SubtitleComponent from './subtitle/Subtitle.component'
import ClipboardButton from 'react-clipboard.js'
import ClipboardIconComponent from 'ui/core/clipboard/ClipboardIcon.component'

class HeaderContainer extends Component {
  renderMinimap () {
    return (<MinimapContainer
      params={this.props.params}
      location={this.props.location}
            />)
  }

  renderSearch () {
    if (this.props.isSearchVisible) {
      return (<SearchContainer />)
    }

    return null
  }

  renderLocationSubtitle () {
    return (<SubtitleComponent
      subtitle={this.props.subtitle}
            />)
  }

  renderTitle () {
    if (this.props.isTitleVisible === false) {
      return null
    }

    let body = (<TitleComponent
      title={this.props.title}

      isVisible={this.props.isTitleVisible}
                />)

    let symbol = (<ClipboardIconComponent
      size={14}
      style={{ fill: 'hsla(199, 69%, 61%, 1)' }}
                  />)
    return (<ClipboardButton
      component='a'
      data-clipboard-text={window.location.href}
      button-title='Copy to clipboard'
            >
      <span>{body} {symbol}</span>
    </ClipboardButton>)
  }

  renderBackButton () {
    return (<BackButtonContainer
      previous={'/'}
      isEnabled={false}
            />)
  }

  render () {
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

HeaderContainer.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string,
  isTitleVisible: PropTypes.bool.isRequired,
  isSearchVisible: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default HeaderContainer
