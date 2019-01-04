import { combineReducers } from 'redux';

import authReducer from './authReducer';
import listsReducer from './listsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  userLists: listsReducer
});

export default rootReducer;