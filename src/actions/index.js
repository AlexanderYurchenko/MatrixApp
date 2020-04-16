import { GENERATE_TABLE, GENERATE_TABLE_ERROR, HOVER_SUM, CELL_CLICK, REMOVE_CLICK, CREATE_CLICK } from "../constants/action-types";

export const generateTable = (payload) => {
  return (dispatch) => {
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

export const hoverSum = (payload) => {
  return (dispatch) => {
    dispatch({ type: HOVER_SUM, payload });
  }
}

export const cellClick = (cellId, rowNum) => {
  return (dispatch) => {
    dispatch({ type: CELL_CLICK, cellId, rowNum });
  }
}

export const removeClick = (rowIndex) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_CLICK, rowIndex });
  }
}

export const createClick = () => {
  return (dispatch) => {
    dispatch({ type: CREATE_CLICK });
  }
}