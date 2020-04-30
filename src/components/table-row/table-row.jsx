import React, { Component } from 'react';
import './table-row.scss';
import { connect } from 'react-redux';
import { hoverSum, removeClick } from '../../actions';
import TableCell from '../table-cell/table-cell';

class TableRow extends Component {
  renderCells(rowCells, dataRow, rowSum) {
    let cells = rowCells.map((cell, index) => {
      const percentAmount = Math.round((cell.amount / rowSum) * 100);

      return (
        <TableCell
          key={index}
          dataRow={dataRow}
          cellId={cell.id}
          percentAmount={percentAmount}
          />
      );
    });

    cells.push(
      <div
        key={cells.length + 1}
        onMouseEnter={this.handleSumHover}
        onMouseLeave={this.handleSumHover}
        className="c-table-row__aux-cell">{rowSum}
        <button className="c-table-row__btn-remove" onClick={this.handleRemoveClick}></button>
      </div>
    );

    return cells;
  };

  handleSumHover = (event) => {
    // event.persist();

    const payload = {
      rowNum: this.props.dataRow,
      eventType: event.type
    };

    this.props.hoverSum(payload);
  };

  handleRemoveClick = () => {
    const dataRow = this.props.dataRow;

    this.props.removeClick(dataRow);
  };

  render() {
    const { rowCells, dataRow, rowSum, sumIsHovered } = this.props;

    return (
      <div
        data-row={dataRow}
        className={"c-table-row" + (sumIsHovered ? '' : ' c-table-row--hide')}>
        {this.renderCells(rowCells, dataRow, rowSum)}
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  const currentRow = state.tableReducer.table[ownProps.dataRow];

  return {
    rowCells: currentRow.cells,
    rowSum: currentRow.rowSum,
    sumIsHovered: currentRow.sumIsHovered
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hoverSum: (payload) => dispatch(hoverSum(payload)),
    removeClick: (dataRow) => dispatch(removeClick(dataRow)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);
