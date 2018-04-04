import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import ErrorBoundaryComponent from './ErrorBoundary.component'
import { action } from '@storybook/addon-actions'
const stories = storiesOf('Error Boundary', module)

export interface IEvilComponentProps {}

export interface IEvilComponentState {
  counter: number
}
export class EvilComponent extends PureComponent<IEvilComponentProps, IEvilComponentState> {
  constructor(props) {
    super(props)
    this.state = { counter: 0 }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(({ counter }) => ({
      counter: counter + 1,
    }))
  }

  render() {
    if (this.state.counter === 3) {
      // Simulate a JS error
      throw new Error('I crashed!')
    }
    return (
      <button style={{ color: 'black', fontSize: '2em' }} onClick={this.handleClick}>
        Click on this until kaboom: {this.state.counter}
      </button>
    )
  }
}

stories.add('default error boundary', () => {
  return (
    <ErrorBoundaryComponent onError={action('on error')}>
      <EvilComponent />
    </ErrorBoundaryComponent>
  )
})

stories.add('custom fallback component in error boundary', () => {
  return (
    <ErrorBoundaryComponent
      fallbackComponent={
        <div style={{ color: 'red', backgroundColor: 'black' }}>
          This is a custom fallback component
        </div>
      }
      onError={action('on error')}
    >
      <EvilComponent />
    </ErrorBoundaryComponent>
  )
})
