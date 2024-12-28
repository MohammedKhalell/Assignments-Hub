import React, { useState, useEffect } from 'react';
import TextInput from './components/TextInput';
import SelectInput from './components/SelectInput';
import CheckboxInput from './components/CheckboxInput';
import Button from './components/Button';
import  "./form.css";
const form = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    age: '',
    country: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'fullName':
        if (!value.trim() || value.length < 3) {
          error = 'Full Name must be at least 3 characters long.';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = 'Please enter a valid email address.';
        }
        break;
      case 'password':
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(value)) {
          error = 'Password must be at least 8 characters long, include at least one number and one special character.';
        }
        break;
      case 'phoneNumber':
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) {
          error = 'Phone Number must be exactly 10 digits.';
        }
        break;
      case 'age':
        if (value < 18 || value > 65) {
          error = 'Age must be between 18 and 65.';
        }
        break;
      case 'country':
        if (!value) {
          error = 'Please select a country.';
        }
        break;
      case 'agreeToTerms':
        if (!value) {
          error = 'You must agree to the terms and conditions.';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    return !error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({ ...prevData, [name]: fieldValue }));
  };

  const isFormValid = () => {
    // Check if all fields are filled and validated
    const hasErrors = Object.values(errors).some((error) => error);
    const allFieldsFilled = Object.values(formData).every((value) => {
      if (typeof value === 'boolean') return value; // For the checkbox
      return value.trim().length > 0; // For text inputs
    });
  
    return !hasErrors && allFieldsFilled;
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.keys(formData).every((key) => validateField(key, formData[key]));

    if (isValid) {
      console.log('Form submitted successfully:', formData);
    } else {
      console.log('Form contains errors:', errors);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
    <TextInput
      label="Full Name"
      name="fullName"
      value={formData.fullName}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.fullName}
      placeholder="Enter your full name"
    />
  
    <TextInput
      label="Email Address"
      name="email"
      value={formData.email}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.email}
      type="email"
      placeholder="Enter your email address"
    />
  
    <TextInput
      label="Password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.password}
      type="password"
      placeholder="Enter a strong password"
    />
  
    <TextInput
      label="Phone Number"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.phoneNumber}
      placeholder="Enter your 10-digit phone number"
    />
  
    <TextInput
      label="Age"
      name="age"
      value={formData.age}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.age}
      type="number"
      placeholder="Enter your age"
    />
  
    <SelectInput
      label="Country"
      name="country"
      value={formData.country}
      onChange={handleChange}
      onBlur={handleBlur}
      options={["USA", "Canada", "UK", "Australia", "India"]}
      error={errors.country}
    />
  
    <CheckboxInput
      label="I agree to the terms and conditions"
      name="agreeToTerms"
      checked={formData.agreeToTerms}
      onChange={handleChange}
      error={errors.agreeToTerms}
    />
  
    <Button
      label="Submit"
      onClick={handleSubmit}
      disabled={!isFormValid()}
    />
  </form>
  
  );
};

export default form;
