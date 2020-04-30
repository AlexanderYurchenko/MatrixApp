import {
  GENERATE_TABLE,
  GENERATE_TABLE_ERROR,
  HOVER_SUM,
  CELL_CLICK,
  CELL_HOVER,
  CELL_BLUR,
  REMOVE_CLICK,
  CREATE_CLICK
} from "../constants/action-types";

export const generateTable = (payload) => {
  if ( !isNaN(payload.columns) && payload.columns &&
    !isNaN(payload.rows) && payload.rows &&
    !isNaN(payload.spread)) {
    if ( payload.columns <= 1000 && payload.rows <= 1000 ) {
      return({ type: GENERATE_TABLE, payload });
    } else {
      const error = 'Cols and rows must be not more than 1000';
      return({
        type: GENERATE_TABLE_ERROR,
        error
      })
    }
  } else {
    const error = 'Input values must be integers';
    return({
      type: GENERATE_TABLE_ERROR,
      error
    })
  }
}

export const hoverSum = (payload) => {
  return({ type: HOVER_SUM, payload });
}

export const cellClick = (cellId, rowNum) => {
  return({ type: CELL_CLICK, cellId, rowNum });
}

export const cellHover = (cellId, cellAmount, dataRow) => {
  return({ type: CELL_HOVER, cellId, cellAmount, dataRow });
}

export const cellBlur = () => {
  return({ type: CELL_BLUR });
}

export const removeClick = (dataRow) => {
  return({ type: REMOVE_CLICK, dataRow });
}

export const createClick = () => {
  return({ type: CREATE_CLICK });
}