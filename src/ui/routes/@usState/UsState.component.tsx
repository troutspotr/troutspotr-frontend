import * as React from 'react'

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
