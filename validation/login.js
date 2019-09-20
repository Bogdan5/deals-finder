const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};
  let dataCopy = {};

  // Convert empty fields to an empty string so we can use validator functions
  dataCopy.username = !isEmpty(data.username) ? data.username : '';
  dataCopy.password = !isEmpty(data.password) ? data.password : '';
  // username checks
  if (Validator.isEmpty(dataCopy.username)) {
    errors.username = 'username field is required';
  }
  // else if (!Validator.isEmail(dataCopy.username)) {
  //   errors.username = 'username is invalid';
  // }
  // Password checks
  if (Validator.isEmpty(dataCopy.password)) {
    errors.password = 'Password field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
