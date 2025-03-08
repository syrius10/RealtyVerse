import axios from 'axios';
import { LOGIN_SUCCESS, REGISTER_SUCCESS } from './types';

export const loginUser = (formData) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/login', formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const registerUser = (formData) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/register', formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};