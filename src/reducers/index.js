import generateReducer from './generateReducer';
import removeRowReducer from './removeRowReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  generateReducer: generateReducer,
  removeRowReducer: removeRowReducer
})

export default allReducers;

