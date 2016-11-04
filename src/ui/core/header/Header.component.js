import React, { PropTypes } from 'react'
// import classes from './Header.scss'
import BackButtonContainer from './backButton/BackButton.container'
import SearchComponent from './search/Search.container'
import MinimapComponent from './minimap/Minimap.container'
import HeaderLayout from './Header.layout'
import TitleComponent from './title/Title.component'
import SubtitleComponent from './subtitle/Subtitle.component'

const HeaderContainer = React.createClass({
  propTypes: {
    subtitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isTitleVisible: PropTypes.bool.isRequired,
    isSearchVisible: PropTypes.bool.isRequired
  },

  // let regionId = this.props.params.regionId || null;

  renderMinimap () {
    return (<MinimapComponent />)
  },

  renderSearch () {
    if (this.props.isSearchVisible) {
      return (<SearchComponent />)
    }

    return null
  },

  renderLocationSubtitle () {
    return (<SubtitleComponent
      subtitle={this.props.subtitle} />)
  },

  renderTitle () {
    if (this.props.isTitleVisible === false) {
      return null
    }
    return (<TitleComponent
      title={this.props.title}
      isVisible={this.props.isTitleVisible} />)
  },

  renderBackButton () {
    return (<BackButtonContainer
      previous={'/'}
      isEnabled={false} />)
  },

  render () {
    return (
      <HeaderLayout
        backButton={this.renderBackButton()}
        locationSubtitle={this.renderLocationSubtitle()}
        title={this.renderTitle()}
        minimap={this.renderMinimap()}
        search={this.renderSearch()} />
    )
  }
})
export default HeaderContainer
