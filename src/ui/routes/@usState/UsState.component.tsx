import * as React from 'react'
// import PropTypes from 'prop-types'

export interface IUsStateComponentDispatchProps {
  fetchStateData(selectedState: string): any
}

export interface IUsStateComponentStateProps {
  selectedState: string
}

export interface IUsStateComponentPassedProps {}

export interface IUsStateComponentProps
  extends IUsStateComponentDispatchProps,
    IUsStateComponentStateProps,
    IUsStateComponentPassedProps {}

export class UsStateComponent extends React.PureComponent<IUsStateComponentProps> {
  public componentDidMount() {
    this.props.fetchStateData(this.props.selectedState)
  }

  public componentWillReceiveProps(nextProps) {
    if (nextProps.selectedState === this.props.selectedState) {
      return
    }
    this.props.fetchStateData(nextProps.selectedState)
  }

  public render() {
    return this.props.children
  }
}

// StateComponent.propTypes = {
//   'selectedState': PropTypes.string.isRequired,
//   'fetchStateData': PropTypes.func.isRequired,
//   'children': PropTypes.element,
// }
