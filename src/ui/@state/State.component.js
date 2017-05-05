import React, { Component } from 'react'

class StateComponent extends Component {
  componentDidMount () {
    this.props.fetchStateData(this.props.selectedState)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedState === this.props.selectedState) {
      return
    }
    this.props.fetchStateData(nextProps.selectedState)
  }

  render () {
    return (this.props.children)
  }
}

StateComponent.propTypes = {
  selectedState: React.PropTypes.string.isRequired,
  fetchStateData: React.PropTypes.func.isRequired,
  children: React.PropTypes.element
}

export default StateComponent
