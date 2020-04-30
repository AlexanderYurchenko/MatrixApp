import React, { Component } from 'react';
import './table-footer.scss';
import { connect } from 'react-redux';

class TableFooter extends Component {
  renderFooterCells() {
    const { table } = this.props;

    // Transpond table with 'map' method
    // let transpondedTable = table[0].cells.map(function(col, i) {
    //   return table.map(function(row) {
    //     return row.cells[i];
    //   });
    // });

    // Transpond table with 'reduce' method
    let transpondedTable = table.reduce((result, row, rowIndex, array) => {
      if (rowIndex === 0) {
        result = new Array(array[0].cells.length);
        for (let i = 0; i < result.length; i++) {
          result[i] = new Array(array.length);
        }
      }
      row.cells.forEach((cell, cellIndex) => {
        result[cellIndex][rowIndex] = cell.amount;
      })
      return result;
    }, []);

    // Find average with 'for' and 'map' methods
    // let averageArray = [];

    // for (let j = 0; j < transpondedTable.length; j++) {
    //   let sum = 0;
    //   transpondedTable[j].map(item => { sum += item.amount });
    //   const average = Math.round(sum / transpondedTable[j].length);
    //   averageArray.push(average);
    // };

    // Find average with 'reduce' method
    let averageArray = transpondedTable.reduce((result, column, colIndex, array) => {
      let averageVal = column.reduce((sum, item) => {
        return sum + item;
      })
      const average = Math.round(averageVal / column.length);
      result[colIndex] = average;
      return result;
    }, []);

    let footerCells = [];
    averageArray.map((cell, index) => {
      footerCells[index] = (<div key={index} className="c-table-footer__cell">{cell}</div>);
    });

    return footerCells;
  };

  render() {
    return (
      <div className="c-table-footer">{this.renderFooterCells()}</div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    table: state.tableReducer.table
  };
};

export default connect(mapStateToProps)(TableFooter);
