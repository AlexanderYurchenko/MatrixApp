import React, { Component } from 'react';
import './table.scss';
import { connect } from 'react-redux';
import { hoverSum, cellClick, removeClick, createClick } from '../../actions';

class Table extends Component {
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
    const { table } = this.props;
    
    for (let i = 0; i < table.length; i++) {
      let rowId = table[i].id;
      content[i] = (<div key={i} data-row={rowId} className={"c-table__row" + (table[i].sumIsHovered ? '' : ' c-table__row--hide')}>{this.renderCells(table[i], i)}</div>);
    }

    return content;
  }

  renderFooter(){
    let { table } = this.props;
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

    const payload = {
      table: this.props.table,
      rowNum,     
      eventType: event.type     
    }

    this.props.hoverSum(payload);
  }

  handleCellClick = (event) => {
    const cellId = event.currentTarget.getAttribute('id');
    const rowNum = event.currentTarget.parentElement.getAttribute('data-row');
    this.props.cellClick(cellId, rowNum);
  }

  handleRemoveClick = (event) => {
    const rowNum = event.currentTarget.closest('[data-row]').getAttribute('data-row'),
          rowIndex = this.getIndex(rowNum, this.props.table);

    this.props.removeClick(rowIndex);
  }  

  handleCreateClick = () => {
    this.props.createClick();
  }

  handleCellHover = (event) => {
    const highlightClass = 'c-table__cell--highlight';

    if (event.type === 'mouseenter') {
      const { table, spread } = this.props,            
            cellId = event.currentTarget.getAttribute('id'),
            cellValue = this.searchCell(cellId, table, 'id').amount,
            allValues = this.getAllCellsValues(table);
      
      const highlightedValues = this.findClosestValues(cellValue, spread, allValues);
      const highlightedValuesLength = highlightedValues ? highlightedValues.length : 0;

      for (let i = 0; i < highlightedValuesLength; i++) {
        const cell = this.searchCell(highlightedValues[i], table, 'amount'),
              cellId = cell.id,
              $cell = document.getElementById(`${cellId}`);
        $cell.classList.add(highlightClass);
      }
    } else {
      const $cells = document.querySelectorAll(".c-table__cell--highlight");

      [].forEach.call($cells, function($cell) {
        $cell.classList.remove(highlightClass);
      });
    }
  }

  getIndex(value, arr) {
    for(let i = 0; i < arr.length; i++) {
      let id = arr[i].id.toString();
      if(id === value) {
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
    return (
      <React.Fragment>
        {this.props.table.length ? 
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
    table: state.tableReducer.table,
    id: state.tableReducer.id,
    spread: state.tableReducer.spread
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hoverSum: (payload) => dispatch(hoverSum(payload)),
    cellClick: (cellId, rowNum) => dispatch(cellClick(cellId, rowNum)),
    removeClick: (rowIndex) => dispatch(removeClick(rowIndex)),
    createClick: () => dispatch(createClick())
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Table);