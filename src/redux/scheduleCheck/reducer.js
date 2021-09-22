import types from './types';

const initialState = {
  getAirports: [],
  getairportTypeList: [],
  airportListLoaded: false,
  aircraftListLoaded: false,
};

const scheduleCheckReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_AIRPORTS:
      return {
        ...state,
        getAirports: action.payload,
      };
    case types.GET_AIRPORT_TYPE_LIST:
      return {
        ...state,
        getairportTypeList: action.payload,
      };
    case types.GET_AIRPORT_LIST_LOADED:
      return {
        ...state,
        airportListLoaded: action.payload,
      };
    case types.GET_AIRCRAFT_LIST_LOADED:
      return {
        ...state,
        aircraftListLoaded: action.payload,
      };
    default:
      return state;
  }
};

export default scheduleCheckReducer;
