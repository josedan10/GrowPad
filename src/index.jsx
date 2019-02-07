import React from 'react'
import ReactDOM from 'react-dom'

// Redux imports
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

// React, Redux and firebase
import { createFirestoreInstance, getFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

import App from './App'
import rootReducer from './store/reducers/'
import firebase from './firebase/config'

import './sass/index.scss'

const store = createStore(rootReducer,
  compose(
    // The thunk middlewares executes the AJAX requests
    applyMiddleware(thunk.withExtraArgument({ getFirestore }))
    // reactReduxFirebase(fbConfig, { userProfile: 'users', enableLogging: false })
  )
)

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)
