import { GENERATE_TABLE, GENERATE_TABLE_ERROR } from "../constants/action-types";

const generateReducer = (state = 0, action) => {
  switch(action.type){
    case GENERATE_TABLE:
      console.log('Generate success');
      return {
        ...state,
        payload: action.payload,
        error: null
      };
    case GENERATE_TABLE_ERROR:
      console.log('Generate fail');
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}

export default generateReducer;