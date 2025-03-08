import axios from 'axios';
import { FETCH_PROPERTIES, FETCH_PROPERTY } from './types';

export const fetchProperties = () => async dispatch => {
  try {
    const res = await axios.get('/api/properties');
    dispatch({
      type: FETCH_PROPERTIES,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchProperty = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/properties/${id}`);
    dispatch({
      type: FETCH_PROPERTY,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};