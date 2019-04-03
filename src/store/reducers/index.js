import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

import scraperReducer from './scraperReducer'

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  scraper: scraperReducer
})

export default rootReducer
