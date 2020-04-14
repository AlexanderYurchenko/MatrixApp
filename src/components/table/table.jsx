import React, { Component } from 'react';
import './table.scss';
import { connect } from 'react-redux';

class Table extends Component {
  state = { 
    table: [],
    tableId: 0,
    spread: 0
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { columns, rows: rowsQuantity, spread } = nextProps.payload;
    if (prevState.tableId !== nextProps.payload.id) {
      let table = [];

      for (let i = 0; i < rowsQuantity; i++) {
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
        table: table,
        tableId: nextProps.payload.id,
        spread: spread
      }
    } else {
      return null;
    }
  }

  renderCells(row) {
    let cells = [];
    var sum = 0;

    for (let i = 0; i < row.cells.length; i++) {
      sum += row.cells[i].amount;
    }

    for (let i = 0; i < row.cells.length; i++) {
      const percentAmount = Math.round((row.cells[i].amount / sum) * 100);
      const style = {
        height: percentAmount+ '%'
      }
      cells[i] = (<div key={i} id={row.cells[i].id} className="c-table__cell" onClick={this.handleCellClick} onMouseEnter={this.handleCellHover} onMouseLeave={this.handleCellHover}>
        <div className="c-table__cell-val">
          <div className="c-table__val-default">{row.cells[i].amount}</div>
          <div className="c-table__val-aux">{percentAmount}%</div>
        </div>
        <div className="c-table__bg" style={style}></div>
      </div>);
    }

    cells.push(<div key={cells.length + 1} onMouseEnter={this.handleSumHover} onMouseLeave={this.handleSumHover} className="c-table__cell c-table__cell--aux">
      <div className="c-table__cell-val">{sum}</div>
      <button className="c-table__btn-remove" onClick={this.handleRemoveClick}></button>
    </div>);

    return cells;
  };

  renderRows(){
    let content = [];
    const { table } = this.state;
    
    for (let i = 0; i < table.length; i++) {
      let rowId = table[i].id;
      content[i] = (<div key={i} data-row={rowId} className="c-table__row c-table__row--hide">{this.renderCells(table[i], i)}</div>);
    }

    return content;
  }

  renderFooter(){
    let { table } = this.state;
    let transpondedTable = table[0].cells.map(function(col, i){
      return table.map(function(row){
        return row.cells[i];
      });
    });

    let averageArray = [];

    for (let j = 0; j < transpondedTable.length; j++) {
      let sum = 0;
      transpondedTable[j].map(item => { sum += item.amount });
      const average = Math.round(sum / transpondedTable[j].length);
      averageArray.push(average);
    }

    return (
      <div className="c-table__row c-table__row--aux">{this.renderFooterCells(averageArray)}</div>
    )
  }

  renderFooterCells(averageArray){
    let footerCells = [];

    for (let i = 0; i < averageArray.length; i++) {
      footerCells[i] = (<div key={i} className="c-table__cell c-table__cell--aux">{averageArray[i]}</div>);
    }

    return footerCells;
  }

  handleSumHover = (event) => {
    const rowNum = event.currentTarget.parentElement.getAttribute('data-row');
    event.persist();

    let $row = document.body.querySelector(`[data-row='${rowNum}']`);

    this.setState(prevState => {
      let table = [ ...prevState.table ];
      if (table[rowNum]) {
        if (event.type === 'mouseenter') {
          table[rowNum].sumIsHovered = true;  
        } else {
          table[rowNum].sumIsHovered = false; 
        };
        return table 
      }
      return
    }, () => {
      if (this.state.table[rowNum] && this.state.table[rowNum].sumIsHovered) {
        $row.classList.remove('c-table__row--hide')
      } else if ($row) {
        $row.classList.add('c-table__row--hide')
      }
    })
  }

  handleCellClick = (event) => {
    const cellId = event.currentTarget.getAttribute('id');
    const rowNum = event.currentTarget.parentElement.getAttribute('data-row');

    this.setState(prevState => {
      let table = [ ...prevState.table ];

      table[rowNum].cells.map(function(cell){
        if (cell.id === cellId) {
          cell.amount++ 
        }
      });
      return table  
    })
  }

  handleRemoveClick = (event) => {
    const rowNum = event.currentTarget.closest('[data-row]').getAttribute('data-row');
    const index = this.getIndex(rowNum, this.state.table);

    this.setState(({ table }) => {
      const newTable = [ ...table ]
      if (index >= 0) {
        newTable.splice(index, 1)
      }
      return { table: newTable }
    })
  }  

  handleCreateClick = () => {
    const { table } = this.state;
    const slicedTable = [...table].slice(-1);
    const lastId = slicedTable[0].id;
    let newTable = [...table];
    const colsQuantity = slicedTable[0].cells.length;
    let cells = [];
    const i = lastId + 1;

    for (let j = 0; j < colsQuantity; j++) {
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

    newTable.push(row);
    this.setState({
      table: newTable
    })
  }

  handleCellHover = (event) => {
    if (event.type === 'mouseenter') {
      const { table, spread } = this.state;
      const cellId = event.currentTarget.getAttribute('id');
      const cellValue = this.searchCell(cellId, table, 'id').amount;
      const allValues = this.getAllCellsValues(table);
      
      const highlightedValues = this.findClosestValues(cellValue, spread, allValues);
      const highlightedValuesLength = highlightedValues ? highlightedValues.length : 0;

      for (let i = 0; i < highlightedValuesLength; i++) {
        const cell = this.searchCell(highlightedValues[i], table, 'amount');
        const cellId = cell.id;
        
        const $cell = document.getElementById(`${cellId}`);
        $cell.classList.add('c-table__cell--highlight');
      }
    } else {
      const $cells = document.querySelectorAll(".c-table__cell--highlight");

      [].forEach.call($cells, function($cell) {
        $cell.classList.remove('c-table__cell--highlight');
      });
    }
  }

  getIndex(value, arr) {
    for(var i = 0; i < arr.length; i++) {
      let id = arr[i].id.toString();
      if(id === value) {
        console.log(id)
        return i;
      }
    }
    
    return -1;
  }

  searchCell(value, array, parameter) {
    if (array) {
      const cellsQuantity = array[0].cells.length;
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < cellsQuantity; j++) {
          if (array[i].cells[j][parameter] === value) {
            return array[i].cells[j];
          }
        }
      }
    } else {
      return null
    }
  }

  getAllCellsValues(array) {
    const cellsQuantity = array[0].cells.length;
    let valuesArray = [];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < cellsQuantity; j++) {
        valuesArray.push(array[i].cells[j].amount);
      }
    }
    return valuesArray;
  }

  compareNumbers(a, b) {
    if (a > b) return 1;
    if (a === b) return 0;
    if (a < b) return -1;
  }

  findClosestValues(value, quantity, array) {
    let slicedArray = [...array.sort(this.compareNumbers)];
    let result = [this.findClosestOne(value, slicedArray).closest];
    
    for (let i = 0; i < quantity; i++) {
      const resultObject = this.findClosestOne(value, slicedArray);
      slicedArray = resultObject.array;
      result.push(resultObject.closest);
    }

    return result
  }

  findClosestOne(value, array) {
    const closest = array.reduce(function(prev, curr) {
      return (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
    });
    const closestIndex = array.indexOf(closest);
    const closestVal = array.splice(closestIndex, 1)[0];

    return {
      array,
      closest: closestVal
    }
  }

  render() { 
    console.log(this.state);

    return (
      <React.Fragment>
        {this.state.table.length ? 
        <div className="c-table">
          <div className="c-table__in">
            {this.renderRows()}
            {this.renderFooter()}            
          </div>
          <button className="c-table__btn-add" onClick={this.handleCreateClick}></button>
        </div>
        : ''
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    payload: state.generateReducer.payload
  }
}
 
export default connect(mapStateToProps)(Table);