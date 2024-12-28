import React from 'react';

export const CheckboxInput = ({ label, name, checked, onChange, error }) => (
  <div>
    <label className="label">
      <input className="input"
        type="checkbox" 
        name={name} 
        checked={checked} 
        onChange={onChange} 
      /> 
      {label}
    </label>
    {error && <p className="error">{error}</p>}
  </div>
);
export default CheckboxInput;
