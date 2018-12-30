import React from 'react'

export interface IErrorSummaryProps {
  error: any
  errorInfo: any
}

export default class ErrorSummaryComponent extends React.PureComponent<IErrorSummaryProps> {
  public render() {
    const { error, errorInfo } = this.props

    if (error == null || errorInfo == null) {
      console.error('Error component rendered but no error object provided')
      return null
    }
    return null
  }
}
