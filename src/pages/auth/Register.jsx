/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import RegisterForm from '../../components/auth/RegisterForm'

export default class RegisterPage extends Component {
  // eslint-disable-next-line react/no-deprecated
  componentWillMount () {
    document.title = 'GrowPad | Register'
  }

  render () {
    return (
      <div className='flex-container-center'>

        <div className='bg-gradient bg-gradient--right' />
        <div className='bg-gradient bg-gradient--left' />
        <RegisterForm />
      </div>
    )
  }
}
