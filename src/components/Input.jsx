import React from 'react';

const Input = props => (
  <div className={`form-input ${props.className}`}>
    <label htmlFor={props.id} className="form-input__label">{props.label}</label>
    <input className="form-input__input " id={props.id} type={props.type} name={props.name} value={props.value} onBlur={props.handleInput} onChange={props.handleInput} />
  </div>
);

export default Input;
