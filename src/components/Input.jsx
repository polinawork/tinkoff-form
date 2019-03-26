import React from 'react';
import PropTypes from 'prop-types';

const Input = props => (
  <div className={`form-input ${props.className}`}>
    <label htmlFor={props.id} className="form-input__label">{props.label}</label>
    <input className="form-input__input " id={props.id} type={props.type} name={props.name} value={props.value} onBlur={props.handleInput} onChange={props.handleInput} />
  </div>
);

Input.propTypes = {
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired

};

export default Input;

