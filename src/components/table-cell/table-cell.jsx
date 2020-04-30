import React, { Component } from 'react';
import './table-cell.scss';
import { connect } from 'react-redux';
import { cellClick, cellHover, cellBlur } from '../../actions';

class TableCell extends Component {
  handleCellClick = () => {
    this.props.cellClick(this.props.cellId, this.props.dataRow);
  };

  handleCellHover = () => {
    this.props.cellHover(this.props.cellId, this.props.cellAmount, this.props.dataRow);
  };

  handleCellBlur = () => {
    this.props.cellBlur();
  };

  render() {
    const { cellId, cellAmount, cellHighlight, percentAmount } = this.props;
    const style = {
      height: percentAmount+ '%'
    };
    const cellClass = 'c-table-cell' + ( cellHighlight ? ' c-table-cell--highlight': '' );

    return (
      <div
        id={cellId}
        className={cellClass}
        onClick={this.handleCellClick}
        onMouseEnter={this.handleCellHover}
        onMouseLeave={this.handleCellBlur}>
        <div className="c-table-cell__val">
          <div className="c-table-cell__val-default">{cellAmount}</div>
          <div className="c-table-cell__val-aux">{percentAmount}%</div>
        </div>
        <div className="c-table-cell__bg" style={style}></div>
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  const cell = state.tableReducer.table[ownProps.dataRow].cells
        .filter((cell) => cell.id === ownProps.cellId )[0];
  return {
    cellId: cell.id,
    cellAmount: cell.amount,
    cellHighlight: cell.highlight
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cellClick: (cellId, rowNum) => dispatch(cellClick(cellId, rowNum)),
    cellHover: (cellId, cellAmount, dataRow) => dispatch(cellHover(cellId, cellAmount, dataRow)),
    cellBlur: () => dispatch(cellBlur())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCell);
