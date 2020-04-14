import { REMOVE_ROW } from "../constants/action-types";

const removeRowReducer = (state = 0, action) => {
  switch(action.type){
    case REMOVE_ROW:
      return state;
    default:
      return state;
  }
}

export default removeRowReducer;