import React, { Component } from 'react'
import Navigation from '../components/Navigation'

export default class Dashboard extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  render () {
    return (
      <div>
        <Navigation />
        <h1>Welcome User. This is the dashboard!</h1>
      </div>
    )
  }
}
