import React from 'react'
// import _ from 'lodash'
// import styles from './StreamDetails.scss'
import { Link } from 'react-router'

const HomeContainer = React.createClass({
  propTypes: {
  },

  // let regionId = this.props.params.regionId || null;

  render () {
    return (
      <div>
        Select your state
        <ul>
          <li><Link to='/mn'>Go To Minnesota</Link></li>
          <li><Link to='/ia'>Go To Iowa</Link></li>
          <li><Link to='/wi'>Go To Wisconsin</Link></li>
        </ul>
      </div>
    )
  }
})

export default HomeContainer
