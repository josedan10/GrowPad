import React, { Component } from 'react'
import RegisterForm from '../../components/auth/RegisterForm'

export default class RegisterPage extends Component {
  render () {
    return (
      <div>
        <h1>Registro de usuario</h1>
        <RegisterForm></RegisterForm>
      </div>
    )
  }
}
