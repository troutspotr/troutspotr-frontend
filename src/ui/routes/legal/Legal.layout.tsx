import * as React from 'react'
const styles = require('./Legal.layout.scss')

export const LegalLayout = props => {
  return (
    <div className={styles.container}>
      <div>{props.children}</div>
    </div>
  )
}
