import React, { Component } from 'react';
import './table.scss';
import { connect } from 'react-redux';
import { createClick } from '../../actions';
import TableRow from '../table-row/table-row';
import TableFooter from '../table-footer/table-footer';

class Table extends Component {
  renderRows() {
    const { table } = this.props;

    let content = table.map((row, index) => {
      const rowId = row.id;
      return (
        <TableRow
          key={index}
          dataRow={rowId}
        />
      );
    });

    return content;
  };

  handleCreateClick = () => {
    this.props.createClick();
  };

  getIndex(value, arr) {
    for(let i = 0; i < arr.length; i++) {
      let id = arr[i].id.toString();
      if(id === value) {
        return i;
      };
    };

    return -1;
  };

  render() {
    return (
      <React.Fragment>
        {this.props.table.length ?
          <div className="c-table">
            <div className="c-table__in">
              {this.renderRows()}
              <TableFooter/>
            </div>
            <button className="c-table__btn-add" onClick={this.handleCreateClick}></button>
          </div>
          : ''
        }
      </React.Fragment>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    table: state.tableReducer.table,
    id: state.tableReducer.id,
    spread: state.tableReducer.spread
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createClick: () => dispatch(createClick())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
