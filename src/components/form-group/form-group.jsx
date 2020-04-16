import React, { Component } from 'react';
import './form-group.scss';

class FormGroup extends Component {
  state = {
    name: '',
    title: '',
    value: '', 
  };

  componentDidMount() {
    this.setState({ 
      name: this.props.name, 
      title: this.props.title, 
    });
  }

  static getDerivedStateFromProps(props) {
    return ({ 
      name: props.name, 
      title: props.title, 
      value: props.value,
    });
  }

  render() { 
    const { name, title, value } = this.state;

    return ( 
      <div className="c-form-group">
        <label className="c-form-group__title" htmlFor={name}>{title}</label>
        <input type='text' className="c-form-group__field" id={name} name={name} value={value} onChange={this.props.onChange}/>
      </div>
    );
  }
}
 
export default FormGroup;