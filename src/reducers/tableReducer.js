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

const initialState = {
  table: null,
  id: null,
  spread: null,
  error: null
};

const getAllCellsValues = (array) => {
  const cellsQuantity = array[0].cells.length;
  let valuesArray = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < cellsQuantity; j++) {
      valuesArray.push({
        cellId: array[i].cells[j].id,
        cellAmount: array[i].cells[j].amount,
        dataRow: array[i].id
      });
    };
  };
  return valuesArray;
};

const compareNumbers= (a, b) => {
  if (a.cellAmount > b.cellAmount) return 1;
  if (a.cellAmount === b.cellAmount) return 0;
  return -1;
};

const findClosestValues = (cellId, dataRow, value, quantity, array) => {
  let slicedArray = [...array.sort(compareNumbers)].filter((cell) => {
    return cell.cellId !== cellId;
  });
  let result = [{
    cellId: cellId,
    dataRow: dataRow
  }];

  for (let i = 0; i < quantity; i++) {
    const resultObject = findClosestOne(value, slicedArray);
    if (resultObject) {
      slicedArray = resultObject.arrayExeptMatch;
      result.push(resultObject.closest);
    }
  };

  return result;
};

const findClosestOne = (value, array) => {
  if (array && array.length !== 0) {
    const closest = array.reduce(function(prev, curr) {
      return (Math.abs(curr.cellAmount - value) < Math.abs(prev.cellAmount - value) ? curr : prev);
    });
    const arrayExeptMatch = array.filter((cell) => {
      return cell.cellId !== closest.cellId;
    });
    
    return {
      arrayExeptMatch,
      closest: {
        cellId: closest.cellId,
        dataRow: closest.dataRow
      }
    };
  }
  return;
};

const tableReducer = (state = initialState, action) => {
  switch(action.type){
    case GENERATE_TABLE:
      const { columns, rows, spread, id } = action.payload;

      if (state.id !== id) {
        let table = [];

        for (let i = 0; i < rows; i++) {
          let cells = [];
          let rowSum = 0;
          for (let j = 0; j < columns; j++) {
            const digit = Math.floor(100 + Math.random() * 900);
            const cell = {
              id: '' + i + j,
              amount: digit,
              highlight: false
            }
            rowSum += digit;
            cells.push(cell);
          }

          let row = {
            id: i,
            cells: cells,
            rowSum: rowSum,
            sumIsHovered: false
          }

          table.push(row);
        }

        return Object.assign({}, state, {
          error: null,
          table: table,
          id,
          spread
        });
      }
      return state;

    case GENERATE_TABLE_ERROR:
      return Object.assign({}, state, {
        error: action.error
      });

    case HOVER_SUM:
      const { rowNum: hoverSumRowNum, eventType } = action.payload,
            hoverId = state.id,
            hoverSpread = state.spread;
      let hoverTable = [...state.table];

      if (hoverTable[hoverSumRowNum]) {
        if (eventType === 'mouseenter') {
          hoverTable[hoverSumRowNum].sumIsHovered = true;
        } else {
          hoverTable[hoverSumRowNum].sumIsHovered = false;
        };
      }
      return Object.assign({}, state, {
        table: hoverTable,
        id: hoverId,
        spread: hoverSpread
      });

    case CELL_CLICK:
      const { cellId: cellClickId, rowNum: cellClickRowNum } = action,
            cellClickTableId = state.id,
            cellClickSpread = state.spread;
      let clickCellTable = state.table.slice();
      let newRowSum = 0;

      clickCellTable[cellClickRowNum].cells.map(function(cell){
        if (cell.id === cellClickId) {
          cell.amount++
        }
        newRowSum += cell.amount;
      })

      clickCellTable[cellClickRowNum].rowSum = newRowSum;

      return Object.assign({}, state, {
        table: clickCellTable,
        id: cellClickTableId,
        spread: cellClickSpread
      });

    case CELL_HOVER:
      const { cellId, cellAmount, dataRow: cellHoverDataRow } = action,
            cellHoverTableId = state.id,
            cellHoverSpread = state.spread,
            cellHoverTable = [...state.table],
            allValues = getAllCellsValues(cellHoverTable),
            highlightedCells = findClosestValues(cellId, cellHoverDataRow, cellAmount, cellHoverSpread, allValues);

      highlightedCells.map(cellResult => {
        cellHoverTable[cellResult.dataRow].cells.filter(cell => {
          return cell.id === cellResult.cellId;
        })[0].highlight = true;
      });

      return Object.assign({}, state, {
        table: cellHoverTable,
        id: cellHoverTableId,
        spread: cellHoverSpread
      });

    case CELL_BLUR:
      const cellBlurTableId = state.id,
            cellBlurSpread = state.spread,
            cellBlurTable = [...state.table];

      cellBlurTable.map(row => {
        row.cells.map(cell => {
          cell.highlight = false;
        })
      });

      return Object.assign({}, state, {
        table: cellBlurTable,
        id: cellBlurTableId,
        spread: cellBlurSpread
      });

    case REMOVE_CLICK:
      const { dataRow } = action,
            removeClickTableId = state.id,
            removeClickSpread = state.spread,
            removeClickTable = [...state.table];
      let filteredTable;

      if (dataRow >= 0) {
        filteredTable = removeClickTable.filter((row) => {
          return row.id !== dataRow;
        });
      };

      for (let i = 0; i < filteredTable.length; i++) {
        filteredTable[i].id = i;
      };

      return Object.assign({}, state, {
        table: filteredTable,
        id: removeClickTableId,
        spread: removeClickSpread
      });

    case CREATE_CLICK:
      const createClickTableId = state.id,
            createClickSpread = state.spread,
            slicedTable = [...state.table].slice(-1),
            lastId = slicedTable[0].id,
            colsQuantity = slicedTable[0].cells.length,
            createClickI = lastId + 1;
      let createClickTable = [...state.table],
          createClickCells = [],
          rowSum = 0;
      for (let j = 0; j < colsQuantity; j++) {
        const digit = Math.floor(100 + Math.random() * 900);
        const cell = {
          id: '' + createClickI + j,
          amount: digit,
          highlight: false
        }
        rowSum += digit;
        createClickCells.push(cell);
      }

      let createClickRow = {
        id: createClickI,
        cells: createClickCells,
        rowSum: rowSum,
        sumIsHovered: false
      }

      createClickTable.push(createClickRow);

      return Object.assign({}, state, {
        table: createClickTable,
        id: createClickTableId,
        spread: createClickSpread
      });

    default:
      return state;
  }
}

export default tableReducer;