import React from 'react'
import Header from './Header.container'
import classes from './CoreLayout.scss'

const CoreLayoutContainer = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired
  },

  render () {
    return (
      <div>
        <Header />
        <div className={classes.profileBody}>
          { this.props.children }
        </div>
      </div>
    )
  }
})

export default CoreLayoutContainer
