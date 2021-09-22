import types from './types';

const initialState = {
  sites: [],
  airportsList: [],
  airportListLoaded: false,
  siteListLoaded: false,
  siteUpdated: {},
  siteLoaded: false,
};

const getSiteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SITES:
      return {
        ...state,
        sites: action.payload,
      };
    case types.GET_AIRPORTS_LIST:
      return {
        ...state,
        airports: action.payload,
      };
    case types.GET_SITE_LIST_LOADED:
      return {
        ...state,
        siteListLoaded: action.payload,
      };
    case types.GET_AIRPORT_LIST_LOADED:
      return {
        ...state,
        airportListLoaded: action.payload,
      };
    case types.SITE_UPDATED:
      return {
        ...state,
        siteUpdated: action.payload,
      };
    case types.SITE_LOADED:
      return {
        ...state,
        siteLoaded: true,
      };
    default:
      return state;
  }
};

export default getSiteReducer;
