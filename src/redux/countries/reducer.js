import types from './types';

const initialState = {
  countries: [],
  countryLoaded: false,
};

const getContriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case types.GET_COUNTRIES_LOADED:
      return {
        ...state,
        countryLoaded: action.payload,
      };
    default:
      return state;
  }
};

export default getContriesReducer;
