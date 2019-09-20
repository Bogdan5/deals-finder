const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  let dataCopy = {};
  // Convert empty fields to an empty string so we can use validator functions
  dataCopy.username = !isEmpty(data.username) ? data.username : '';
  dataCopy.email = !isEmpty(data.email) ? data.email : '';
  dataCopy.password = !isEmpty(data.password) ? data.password : '';
  dataCopy.password2 = !isEmpty(data.password2) ? data.password2 : '';
  // Name checks
  if (Validator.isEmpty(dataCopy.username)) {
    console.log('Name field is required');
    errors.name = 'Name field is required';
  }
  // Email checks
  if (Validator.isEmpty(dataCopy.email)) {
    console.log('Email field is required');
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(dataCopy.email)) {
    console.log('Email is invalid');
    errors.email = 'Email is invalid';
  }
  // Password checks
  if (Validator.isEmpty(dataCopy.password)) {
    console.log('Password field is required');
    errors.password = 'Password field is required';
  }
  if (Validator.isEmpty(dataCopy.password2)) {
    console.log('Confirm password field is required');
    errors.password2 = 'Confirm password field is required';
  }
  if (!Validator.isLength(dataCopy.password, { min: 6, max: 30 })) {
    console.log('Password must be at least 6 characters');
    errors.password = 'Password must be at least 6 characters';
  }
  if (!Validator.equals(dataCopy.password, dataCopy.password2)) {
    console.log('Passwords must match');
    errors.password2 = 'Passwords must match';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
