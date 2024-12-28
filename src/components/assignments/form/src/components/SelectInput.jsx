import React from 'react';

export const SelectInput = ({ label, name, value, onChange, options, error }) => (
  <div>
    <label className="label">{label}:</label>
    <select className="select" name={name} value={value} onChange={onChange}>
      <option value="">Select a {label.toLowerCase()}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="error">{error}</p>}
  </div>
);
export default SelectInput;
