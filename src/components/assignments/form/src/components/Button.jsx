import React from 'react';

export const Button = ({ label, onClick, disabled }) => (
  <button className="button"
    type="button" 
    onClick={onClick} 
    disabled={disabled}
  >
    {label}
  </button>
);
export default Button;
