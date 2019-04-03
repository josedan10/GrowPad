import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { firebaseConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
const AuthRoute = ({ component: Component, ...props }) => (
  (!props.auth.isLoaded) ? 'Loading ...'
    : (!props.auth.isEmpty)
      ? <Component {...props} />
      : <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location }
        }}
      />
)

AuthRoute.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

const mapStateToProps = state => {
  return { auth: state.firebase.auth }
}

const mapDispatchToProps = {
}

export default compose(
  withRouter,
  firebaseConnect(), // withFirebase can also be used
  connect(mapStateToProps, mapDispatchToProps)
)(AuthRoute)
