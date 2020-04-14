import React, { Component } from 'react';
import './intake.scss';
import FormGroup from "../form-group/form-group";
import { connect } from 'react-redux';
import { generateTable } from '../../actions'

class Intake extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      columns: null,
      rows: null,
      spread: null,
      id: 1,
      error: null
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      error: nextProps.error
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value 
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      id: this.state.id + 1
    })
    this.props.generateTable(this.state);
  }

  render() { 
    console.log(this.state);

    return ( 
      <form className="c-intake" onSubmit={this.handleSubmit}>
        <div className="c-intake__title">Table parameters</div>
        <div className="c-intake__box">
          <div className="c-intake__col">
            <FormGroup 
              name="rows" 
              title="M (rows, max 15)" 
              onChange={this.handleChange}/>
          </div>
          <div className="c-intake__col">
            <FormGroup 
              name="columns" 
              title="N (cols, max 15)" 
              onChange={this.handleChange}/>
          </div>
          <div className="c-intake__col">
            <FormGroup 
              name="spread" 
              title="X (spread)" 
              onChange={this.handleChange}/>
          </div>
        </div>
        { this.state.error && (
          <div className="c-intake__error">{this.state.error}</div>
        )}
        <div className="c-intake__btn-box">
          <button type="submit" className="c-btn c-intake__btn">Generate</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.generateReducer.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    generateTable: (payload) => dispatch(generateTable(payload))
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Intake);