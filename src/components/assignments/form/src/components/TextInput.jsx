import React from 'react';
export const TextInput = ({ label, name, value, onChange, onBlur, error, type = 'text', placeholder }) => (
  <div>
    <label className="label">{label}:</label>
    <input className="input"
      type={type} 
      name={name} 
      value={value} 
      onChange={onChange} 
      onBlur={onBlur} 
      placeholder={placeholder} 
    />
    {error && <p className="error">{error}</p>}
  </div>
);

export default TextInput;
