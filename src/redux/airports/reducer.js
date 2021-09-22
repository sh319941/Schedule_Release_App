import types from './types';

const initialState = {
  airports: [],
  countries: [],
  countryListLoaded: false,
  airportListLoaded: false,
};

const getAirportReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_AIRPORTS:
      return {
        ...state,
        airports: action.payload,
      };

    case types.GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case types.GET_COUNTRY_LIST_LOADED:
      return {
        ...state,
        countryListLoaded: action.payload,
      };
    case types.GET_AIRPORT_LIST_LOADED:
      return {
        ...state,
        airportListLoaded: action.payload,
      };
    default:
      return state;
  }
};

export default getAirportReducer;
