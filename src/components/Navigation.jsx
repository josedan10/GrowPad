import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

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
          <Link to="/">Home</Link>
          <Link to="/Somewhere">404</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>
      ) : (
        <nav>
          <Link to="/">Home</Link>
          <Link to="/Somewhere">404</Link>
          <Link to="/#" onClick={this.logout}>Logout</Link>
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


