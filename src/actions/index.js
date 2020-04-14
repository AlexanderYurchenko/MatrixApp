import { GENERATE_TABLE, GENERATE_TABLE_ERROR } from "../constants/action-types";

export const generateTable = (payload) => {
  return (dispatch) => {
    console.log(payload);
    if ( !isNaN(payload.columns) && payload.columns && 
      !isNaN(payload.rows) && payload.rows &&
      !isNaN(payload.spread)) {
      if ( payload.columns <= 15 && payload.rows <= 15 ) {
        dispatch({ type: GENERATE_TABLE, payload });
      } else {
        const error = 'Cols and rows must be not more than 15';
        dispatch({
          type: GENERATE_TABLE_ERROR,
          error
        })
      }
    } else {
      const error = 'Input values must be integers';
      dispatch({
        type: GENERATE_TABLE_ERROR,
        error
      })
    }
  }
}
