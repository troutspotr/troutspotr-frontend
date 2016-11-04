import React from 'react'
// import classes from './Header.scss'
import BackButtonComponent from './BackButton.component'
import SearchComponent from './search/Search.container'
import MinimapComponent from './minimap/Minimap.container'
import HeaderLayout from './Header.layout'

const RENDER_SEARCH = false
const HeaderContainer = React.createClass({
  propTypes: {
  },

  // let regionId = this.props.params.regionId || null;

  renderMinimap () {
    return (<MinimapComponent />)
  },

  renderSearch () {
    if (RENDER_SEARCH) {
      return (<SearchComponent />)
    }

    return null
  },

  renderLocationSubtitle () {
    return (<span>MN, Driftless Region</span>)
  },

  renderTitle () {
    let isVisible = RENDER_SEARCH === false
    if (isVisible === false) {
      return null
    }

    return (<span>Whitewater River, North Branch</span>)
  },

  renderBackButton () {
    return (<BackButtonComponent
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
