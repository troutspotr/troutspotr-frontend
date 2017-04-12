import React, { PropTypes } from 'react'

const SvgAnimatedCircle = React.createClass({
  propTypes: {
    cssName: PropTypes.string.isRequired,
    coordinates: PropTypes.array.isRequired,
    radius: PropTypes.number.isRequired
  },

  render () {
    return (
      <path
        className={this.props.cssName}
        cx={this.props.coordinates[0]}
        cy={this.props.coordinates[1]}
        r={this.props.radius} />
    )
  }
})

export default SvgAnimatedCircle
