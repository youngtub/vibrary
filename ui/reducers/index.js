import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import TEST from './test';
import selected from './selected';

const rootReducer = combineReducers({
  TEST,
  selected
});

export default rootReducer;
