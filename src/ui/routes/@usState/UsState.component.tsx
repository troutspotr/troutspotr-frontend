import * as React from 'react'
// import PropTypes from 'prop-types'
class StateComponent extends React.PureComponent<any> {
  componentDidMount() {
    // this.props.fetchStateData(this.props.selectedState)
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.selectedState === this.props.selectedState) {
    //   return
    // }
    // this.props.fetchStateData(nextProps.selectedState)
  }

  render() {
    console.log('renderin')
    return this.props.children
  }
}

// StateComponent.propTypes = {
//   'selectedState': PropTypes.string.isRequired,
//   'fetchStateData': PropTypes.func.isRequired,
//   'children': PropTypes.element,
// }

export default StateComponent
