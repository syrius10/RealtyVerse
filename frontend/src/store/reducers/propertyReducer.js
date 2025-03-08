import { FETCH_PROPERTIES, FETCH_PROPERTY } from '../actions/types';

const initialState = {
  properties: [],
  property: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PROPERTIES:
      return {
        ...state,
        properties: payload
      };
    case FETCH_PROPERTY:
      return {
        ...state,
        property: payload
      };
    default:
      return state;
  }
}