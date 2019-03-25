import React from 'react';

const Button = props => (
  <div className="form-info">
    <button className="form-button">Продать на {props.value} ₽</button>
  </div>
);

export default Button;
