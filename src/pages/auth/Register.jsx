import React, { Component } from 'react';
import RegisterForm from '../../components/auth/RegisterForm';

export default class RegisterPage extends Component {
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
