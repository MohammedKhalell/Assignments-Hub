const validatePassword = (password) => {
  const minLength = 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);

  if (password.length < minLength) {
    return "Password must be at least 8 characters long";
  }
  if (!hasNumber) {
    return "Password must contain at least one number";
  }
  if (!hasLetter) {
    return "Password must contain at least one letter";
  }
  return "";
};

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
  const passwordError = validatePassword(formData.password);
  if (passwordError) {
    errors.password = passwordError;
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
