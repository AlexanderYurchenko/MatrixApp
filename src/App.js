import React from 'react';
import './App.scss';
import Intake from './components/intake/intake';
import Table from './components/table/table';
import { connect } from 'react-redux';

function App(props) {
  const { payload } = props;

  return (
    <React.Fragment>
      <div className="w-inner">
        <div className="c-header">
          <div className="w-center">
            <div className="c-header__in">
              <div className="c-header__logo">MatrixApp</div>
            </div>
          </div>
        </div>
        <div className="w-center">
          <div className="w-content">
            <Intake />
            { payload && <Table /> }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    payload: state.generateReducer.payload
  }
}

export default connect(mapStateToProps)(App);
