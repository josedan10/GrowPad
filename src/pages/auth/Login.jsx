/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import LoginForm from '../../components/auth/LoginForm'

export default class LoginPage extends Component {
  // eslint-disable-next-line react/no-deprecated
  componentWillMount () {
    document.title = 'GrowPad | Login'
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
        <LoginForm />
      </div>
    )
  }
}
