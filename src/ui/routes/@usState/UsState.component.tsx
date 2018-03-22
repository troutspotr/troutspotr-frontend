import * as React from 'react'
// import PropTypes from 'prop-types'
class StateComponent extends React.PureComponent<any> {
  public componentDidMount() {
    // this.props.fetchStateData(this.props.selectedState)
  }

  public componentWillReceiveProps(nextProps) {
    // if (nextProps.selectedState === this.props.selectedState) {
    //   return
    // }
    // this.props.fetchStateData(nextProps.selectedState)
  }

  public render() {
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
