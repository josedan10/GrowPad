import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import SocialAuth from './SocialAuth';

class RegisterForm extends Component {

  constructor(props) {
    super(props);

    this.createUserWithEmail = this.createUserWithEmail.bind(this);
    this.state = {
      username: '',
      email: '',
      pass1: '',
      pass2: '',
      sex: '',
      age: '',
      birthdate: '',
      state: '',
      msg: '',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    auth: PropTypes.object,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
      createUser: PropTypes.func.isRequired
    }),
  }

  componentDidUpdate () {
    // load backend
    if (this.state.msg !== '') {

      switch (this.state.state) {
        case 'created':
          setTimeout(window.reload(), 2000);
          break;
        
        default:
          setTimeout(()=> {}, 2000);
          this.setState({...this.state, msg: ''});
          break;
      }
    }
  }

  handleChange (e) {
    this.setState({...this.state, [e.target.name]: e.target.value});
  }

  emailValidator(email) {
    let errors = [];
    // eslint-disable-next-line
    let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.trim() === "") errors.push("Please write your email.");
    else if (!email.match(emailRegEx)) errors.push("The email format is not valid.");

    return errors;
  }

  passwordValidator(pass1, pass2) {
    let errors = [];

    if (pass1.trim() === "") errors.push("Please write your password.");
    else if (pass1.length < 8) errors.push("Your password must have least than 8 characters");
    else if (pass1 !== pass2) errors.push("Passwords doesn't match");

    return errors;
  }

  createUserWithEmail (e) {
    e.preventDefault();

    let errors = false;

    // Validations

    if (this.emailValidator(this.state.email).length > 0){

      this.emailValidator(this.state.email).forEach(err => console.error("Error: " + err));
      errors = true;
    }

    if (this.passwordValidator(this.state.pass1, this.state.pass2).length > 0) {

      this.passwordValidator(this.state.pass1, this.state.pass2).forEach(err => console.error("Error: " + err));
      errors = true;
    }

    // Firebase authentication
    let {
      email,
      pass1,
      username,
      firstName,
      lastName,
      sex,
      age,
      birthdate
    } = this.state;

    if (!errors) 
      this.props.firebase.createUser({ email, password: pass1 }, { 
        username, 
        firstName, 
        lastName, 
        email, 
        age, 
        sex, 
        birthdate })
      .then(() => this.setState({...this.state, state: 'created', msg: 'User Created'}))
      .catch((err) => this.setState({...this.state, state: 'error', message: err.message}));
      
  }

  render() {

    return (
      <div className='form-auth'>
          { this.state.msg !== '' && <span className="alert">{this.state.msg}</span>}
          <form className="flex-container form-container" action="post">

            <section className='flex-container'>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input className='input-auth' type="text" name="username" onChange={this.handleChange}/>
              </div>

              <div className="input-group">
                <label htmlFor="firstName">First Name</label>
                <input className='input-auth' type="text" name="firstName" onChange={this.handleChange}/>
              </div>

              <div className="input-group">
                <label htmlFor="pass1">Password</label>
                <input className='input-auth' type="password" name="pass1" onChange={this.handleChange}/>
              </div>

              <div className="input-group">
                <label htmlFor="age">Age</label>
                <input className='input-auth' type="text" name="age" onChange={this.handleChange}/>
              </div>

              <div className="input-group">
                <label htmlFor="sex">Sex</label>
                M <input type="radio" name="sex" value="M" onChange={this.handleChange}/> 
                F <input type="radio" name="sex" value="F" onChange={this.handleChange}/>              
              </div>
            </section>

            <section className='flex-container'>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input className='input-auth' type="email" name="email" onChange={this.handleChange}/>
              </div>

              <div className="input-group">
                <label htmlFor="lastName">Last Name</label>
                <input className='input-auth' type="text" name="lastName" onChange={this.handleChange}/>
              </div>

              <div className="input-group">
                <label htmlFor="pass2">Confirm Password</label>
                <input className='input-auth' type="password" name="pass2" onChange={this.handleChange}/>
              </div>

              <div className="input-group">
                <label htmlFor="birthday">birthday</label>
                <input className='input-auth' type="date" name="birthday" onChange={this.handleChange}/>
              </div>
              
            </section>
            
            {/* <div className="input-group">
              <label htmlFor="birthdate">Birthdate</label>
              <input className='input-auth' type="date" name="birthdate" onChange={this.handleChange}/>
            </div> */}


            <div className="input-group">
              <button className='btn-primary text-align-left' onClick={this.createUserWithEmail}>
                CREATE<br />ACCOUNT
                <i className='icon icon-arrow'></i>
              </button>
            </div>
          </form>

          <SocialAuth />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { auth: state.firebase.auth }
};

const mapDispatchToProps = {
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect()
)(RegisterForm);