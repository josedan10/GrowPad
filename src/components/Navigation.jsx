import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this); 
  }

  logout (e) {
    e.preventDefault();
    this.props.firebase.logout();
    history.push('/login');
    window.location.reload();
  }

  render() {
    return (
      <nav>
        <Link to="/register">Register</Link>
        <Link to="/">Home</Link>
        <Link to="/Somewhere">404</Link>
        {(!this.props.auth.isEmpty) ? 
          <Link to="/#" onClick={this.logout}>Logout</Link> : 
          <Link to="/login">Login</Link>
        }
      </nav>
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
)(Navigation);


