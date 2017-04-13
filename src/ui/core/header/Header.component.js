import React, { PropTypes, Component } from 'react'
import BackButtonContainer from './backButton/BackButton.container'
import SearchContainer from './search/Search.container'
import MinimapContainer from './minimap/Minimap.container'
import HeaderLayout from './Header.layout'
import TitleComponent from './title/Title.component'
import SubtitleComponent from './subtitle/Subtitle.component'
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
    return (<TitleComponent
      title={this.props.title}
      isVisible={this.props.isTitleVisible}
            />)
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
