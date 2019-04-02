import React, { Component } from 'react'
import LoginForm from '../../components/auth/LoginForm'

export default class LoginPage extends Component {
  render () {
    return (
      <div>
        <h1>Login</h1>
        <LoginForm></LoginForm>
      </div>
    )
  }
}
