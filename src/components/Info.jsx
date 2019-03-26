import React from 'react';
import PropTypes from 'prop-types';

const Info = props => (
  <div className="form-info">
    <div className="form-info__title">{props.title}</div>
    <div className="form-info__value">{props.value} {props.cur}</div>
  </div>
);

Info.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  cur: PropTypes.string.isRequired
};

export default Info;
