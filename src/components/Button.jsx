import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
  <button className="form-button">Продать {(props.value) ? `на ${props.value} ₽` : ''}</button>
);

Button.propTypes = {
  value: PropTypes.string.isRequired
};

export default Button;
