import React from 'react'
import ErrorSummaryComponent from './ErrorSummary.component'

export interface IErrorBoundaryProps {
  onError(error: any, errorInfo: any): void
  fallbackComponent?: React.ReactNode
  children: React.ReactNode
}

export interface IErrorBoundaryState {
  error: any
  errorInfo: any
}

class ErrorBoundaryComponent extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props) {
    super(props)
    this.handleError = this.handleError.bind(this)
    this.state = {
      error: null,
      errorInfo: null,
    }
  }

  public handleError(error, errorInfo) {
    const { onError } = this.props
    if (onError == null) {
      console.error('No error handler found')
      return
    }
    onError(error, errorInfo)
  }

  public componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState(() => {
      this.handleError(error, errorInfo)
      return {
        error: error,
        errorInfo: errorInfo,
      }
    })
    // You can also log error messages to an error reporting service here
  }

  public render() {
    const { error, errorInfo } = this.state

    const { fallbackComponent, children } = this.props
    if (error == null) {
      return children || null
    }
    // if you reach this point, something bad happened.

    // We want to allow `null` fallbacks
    // for components with no rendered content,
    // so we need to explicitly look for undefined
    // and not just null.
    if (typeof fallbackComponent !== 'undefined') {
      return fallbackComponent
    }

    return <ErrorSummaryComponent error={error} errorInfo={errorInfo} />
  }
}

export default ErrorBoundaryComponent
