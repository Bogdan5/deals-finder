import jwt_decode from 'jwt-decode';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
} from './types';

// Set logged in user
export const setCurrentUser = (decoded) => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post('/users/register', userData)
    .then((res) => history.push('/')) // re-direct to login on successful register
    .catch((err) => {
      console.log('Error ', err.response);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Login - get user token
export const loginUser = (userData, history) => (dispatch) => {
  axios
    .post('/users/login', userData)
    .then((res) => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      console.log('Token in loginUser ', token);
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      history.push('/dashboard');
    })
    .catch((err) => {
      console.log('Err ', err);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};

// User loading
export const setUserLoading = () => ({
  type: USER_LOADING,
});

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
