export const validateForm = (formData, isSignup = false) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
  
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Email must end with .com';
    }
  
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      errors.password = 'Password must be at least 4 characters long';
    }
  
    // Additional signup validations
    if (isSignup) {
      if (!formData.name) {
        errors.name = 'Name is required';
      }
      
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
  
    return errors;
  };
  