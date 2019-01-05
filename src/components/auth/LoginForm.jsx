import React, { Component } from 'react'
import { compose } from 'recompose';
import { connect } from'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
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
  
  handleSubmit(e) {
    e.preventDefault();

    console.log(this.props);

    this.props.firebase.login(this.state);   
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input type="text" name="email" placeholder="user@mail.com" onChange={this.handleChange}/>
          </div>
          <div className="input-group">
            <input type="password" name="password" placeholder="********" onChange={this.handleChange}/>
          </div>

          <div className="input-group">
            <input type="submit" value="Login" className="btn btn-submit"/>
          </div>
        </form>
        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = {
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect()
)(LoginForm);