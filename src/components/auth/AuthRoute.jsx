import React from 'react';
import { Redirect } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AuthRoute extends React.Component {

  render () {
    console.log(this.props);
    let Component = this.props.component;

    return (
      (!this.props.auth.isLoaded) ? 'Loading ...':
        (!this.props.auth.isEmpty) ? 
          <Component {...this.props} /> :
          <Redirect
            to={{
              pathname: "/login",
              state: { from: this.props.location }
            }}
          />
    );
  }
}

AuthRoute.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }),
  auth: PropTypes.object
}

const mapStateToProps = state => {
  return { auth: state.firebase.auth }
};

const mapDispatchToProps = {
};

export default compose(
  withRouter,
  firebaseConnect(), // withFirebase can also be used
  connect(mapStateToProps, mapDispatchToProps)
)(AuthRoute)