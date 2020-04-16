import tableReducer from './tableReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  tableReducer: tableReducer
})

export default allReducers;

