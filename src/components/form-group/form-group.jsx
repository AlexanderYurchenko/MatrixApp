import React from 'react';
import './form-group.scss';

const FormGroup = (props) => {
  const { name, title, value } = props;

  return (
    <div className="c-form-group">
      <label className="c-form-group__title" htmlFor={name}>{title}</label>
      <input type='text' className="c-form-group__field" id={name} name={name} value={value} onChange={props.onChange}/>
    </div>
  );
}
 
export default FormGroup;