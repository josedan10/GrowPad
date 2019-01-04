import React, { Component } from 'react';

export default class Register extends Component {

  constructor(props) {
    super(props);

    this.createUser = this.createUser.bind(this);
  }

  componentWillMount () {
    document.title = "Register";
  }

  emailValidator(email) {
    let errors = [];
    let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.trim() === "") errors.push("Please write your email.");
    else if (!email.match(emailRegEx)) errors.push("The email format is not valid.");

    return errors;
  }

  passwordValidator(pass) {
    let errors = [];

    if (pass.trim() === "") errors.push("Please write your password.");
    else if (pass.length < 8) errors.push("Your password must have least than 8 characters");

    return errors;
  }

  createUser () {
    var email = document.getElementById('email').value,
        password = document.getElementById('password').value;

    let errors = false;

    // Validations

    if (this.emailValidator(email).length > 0){

      this.emailValidator(email).forEach(err => console.error("Error: " + err));
      errors = true;
    }

    if (this.passwordValidator(password).length > 0) {

      this.passwordValidator(password).forEach(err => console.error("Error: " + err));
      errors = true;
    }

    // Firebase authentication
    // if (!errors) 
      
  }

  render() {
    
    return (
      <div>
        <h1>Funciona el router</h1>
        <section>
          <form action="post">
            
          </form>
        </section>
      </div>
    )
  }
}
