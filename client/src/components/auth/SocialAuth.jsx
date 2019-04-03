import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import PropTypes from 'prop-types'

export const SocialAuth = ({ firebase, auth }) => (
  <div className='socialAuth'>
    <button // <GoogleButton/> button can be used instead
      className='btn-primary'
      onClick={() => firebase.login({ provider: 'google', type: 'popup' })}
    >Login With Google</button>
    <div>
      <h2>Auth</h2>
      {
        !isLoaded(auth)
          ? <span>Loading...</span>
          : isEmpty(auth)
            ? <span>Not Authed</span>
            : <pre>{JSON.stringify(auth, null, 2)}</pre>
      }
    </div>
  </div>
)

SocialAuth.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(SocialAuth)
