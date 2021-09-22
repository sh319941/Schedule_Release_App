import types from './types';
import loaderTypes from '../loader/types';

const baseAction = (action, payload = {}) => ({ type: action, payload });

function getAirports(token, params) {
  return async (dispatch, getState, services) => {
    const { Api, ErrorHandler } = services;
    dispatch(baseAction(types.GET_AIRPORT_LIST_LOADED, false));

    try {
      const airports = await Api.getAirports(token, params);
      dispatch(baseAction(types.GET_AIRPORTS, airports));
      dispatch(baseAction(types.GET_AIRPORT_LIST_LOADED, true));

      return airports;
    } catch (err) {
      dispatch(baseAction(types.GET_AIRPORT_LIST_LOADED, true));
      return dispatch(ErrorHandler.addErrorToQueue(err));
    }
  };
}

function getairportTypeList(token, params) {
  return async (dispatch, getState, services) => {
    const { Api, ErrorHandler } = services;
    dispatch(baseAction(types.GET_AIRCRAFT_LIST_LOADED, false));

    try {
      const airportTypeList = await Api.getairportTypeList(token, params);
      dispatch(baseAction(types.GET_AIRPORT_TYPE_LIST, airportTypeList));
      dispatch(baseAction(types.GET_AIRCRAFT_LIST_LOADED, true));
      return airportTypeList;
    } catch (err) {
      dispatch(baseAction(types.GET_AIRCRAFT_LIST_LOADED, true));
      return dispatch(ErrorHandler.addErrorToQueue(err));
    }
  };
}
const getSingleCheck = (token, params = {}) => async (dispatch, getState, services) => {
  const { Api, ErrorHandler } = services;
  dispatch(baseAction(loaderTypes.IS_LOADER, true));
  try {
    const shellList = await Api.getFlightCheck(token, params);
    dispatch(baseAction(loaderTypes.IS_LOADER, false));
    return shellList;
  } catch (err) {
    dispatch(baseAction(loaderTypes.IS_LOADER, false));
    return dispatch(ErrorHandler.addErrorToQueue(err));
  }
};
export default {
  getAirports,
  getairportTypeList,
  getSingleCheck,
};
