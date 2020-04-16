import { GENERATE_TABLE, GENERATE_TABLE_ERROR, HOVER_SUM, CELL_CLICK, REMOVE_CLICK, CREATE_CLICK } from "../constants/action-types";

const tableReducer = (state = 0, action) => {
  switch(action.type){
    case GENERATE_TABLE:
      const { columns, rows, spread, id } = action.payload;

      if (state.id !== id) {
        let table = [];
  
        for (let i = 0; i < rows; i++) {
          let cells = [];
          for (let j = 0; j < columns; j++) {
            const digit = Math.floor(100 + Math.random() * 900);
            const cell = {
              id: '' + i + j,
              amount: digit
            }
            cells.push(cell);
          }
  
          let row = {
            id: i,
            cells: cells,
            sumIsHovered: false
          }
  
          table.push(row);
        }   

        return {
          ...state,
          error: null,
          table: table,
          id,
          spread
        };
      }
      return
      
    case GENERATE_TABLE_ERROR:
      return {
        ...state,
        error: action.error
      }

    case HOVER_SUM: 
      const { table: hoverSumTable, rowNum: hoverSumRowNum, eventType } = action.payload,
            hoverId = state.id,
            hoverSpread = state.spread,
            hoverTable = [...hoverSumTable];

      if (hoverTable[hoverSumRowNum]) {
        if (eventType === 'mouseenter') {
          hoverTable[hoverSumRowNum].sumIsHovered = true;  
        } else {
          hoverTable[hoverSumRowNum].sumIsHovered = false; 
        };
      }
      return {
        table: hoverTable,
        id: hoverId,
        spread: hoverSpread
      }

    case CELL_CLICK:
      const { cellId: cellClickId, rowNum: cellClickRowNum } = action,
            cellClickTableId = state.id,
            cellClickSpread = state.spread,
            clickCellTable = [...state.table];

      clickCellTable[cellClickRowNum].cells.map(function(cell){
        if (cell.id === cellClickId) {
          cell.amount++ 
        }
      })

      return {
        table: clickCellTable,
        id: cellClickTableId,
        spread: cellClickSpread
      }

    case REMOVE_CLICK:
      const { rowIndex } = action,
            removeClickTableId = state.id,
            removeClickSpread = state.spread,
            removeClickTable = [...state.table];

      if (rowIndex >= 0) {
        removeClickTable.splice(rowIndex, 1)
      }

      for (let i = 0; i < removeClickTable.length; i++) {
        removeClickTable[i].id = i;
      }   

      return {
        table: removeClickTable,
        id: removeClickTableId,
        spread: removeClickSpread
      }

    case CREATE_CLICK:
      const createClickTableId = state.id,
            createClickSpread = state.spread,            
            slicedTable = [...state.table].slice(-1),
            lastId = slicedTable[0].id,
            colsQuantity = slicedTable[0].cells.length,
            createClickI = lastId + 1;
      let createClickTable = [...state.table],
          createClickCells = [];

      for (let j = 0; j < colsQuantity; j++) {
        const digit = Math.floor(100 + Math.random() * 900);
        const cell = {
          id: '' + createClickI + j,
          amount: digit
        }
        createClickCells.push(cell);
      }

      let createClickRow = {
        id: createClickI,
        cells: createClickCells,
        sumIsHovered: false
      }

      createClickTable.push(createClickRow);

      return {
        table: createClickTable,
        id: createClickTableId,
        spread: createClickSpread
      }

    default:
      return state;
  }
}

export default tableReducer;