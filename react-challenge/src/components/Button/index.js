import React from 'react';
import PropTypes from 'prop-types';
import './index.style.css';

function Button({ children, onClick }) {
  return (
    <button className="btn" data-testid='btn' onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
