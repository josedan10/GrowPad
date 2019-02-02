import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

/**
 * NavBar contains links for authenticated and guest user
 * 
 */

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this); 
  }

  logout (e) {
    e.preventDefault();
    this.props.firebase.logout();
    this.props.history.push('/login');
  }

  render() {
    const navigation = (!this.props.auth.isLoaded) ? null :
      (this.props.auth.isEmpty) ? (
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/Somewhere">404</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      ) : (
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/Somewhere">404</NavLink>
          <NavLink to="/#" onClick={this.logout}>Logout</NavLink>
        </nav>
      );
    return (
      navigation
    );
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
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect()
)(Navigation);


