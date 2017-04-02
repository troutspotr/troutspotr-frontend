import React from 'react'
// import classes from './BubblesList.scss'
// import BubbleComponent from './Bubble.component'

const StateComponent = React.createClass({
  propTypes: {
    selectedState: React.PropTypes.string.isRequired,
    fetchStateData: React.PropTypes.func.isRequired,
    children: React.PropTypes.element
  },

  componentDidMount () {
    this.props.fetchStateData(this.props.selectedState)
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedState === this.props.selectedState) {
      return
    }
    console.log('fetching new state')
    this.props.fetchStateData(nextProps.selectedState)
  },

  render () {
    return (this.props.children)
  }
})
export default StateComponent
