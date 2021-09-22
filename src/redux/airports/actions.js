import types from './types';
import loaderTypes from '../loader/types';

const baseAction = (action, payload = {}) => ({ type: action, payload });

function getAirports(token, params = {}) {
  return async (dispatch, getState, services) => {
    const { Api, ErrorHandler } = services;
    dispatch(baseAction(loaderTypes.IS_LOADER, true));
    try {
      const airports = await Api.getAirports(token, params);
      dispatch(baseAction(types.GET_AIRPORTS, airports));
      dispatch(baseAction(loaderTypes.IS_LOADER, false));
      return airports;
    } catch (err) {
      dispatch(baseAction(loaderTypes.IS_LOADER, false));
      return dispatch(ErrorHandler.addErrorToQueue(err));
    }
  };
}

function getCountries(token, params = {}) {
  return async (dispatch, getState, services) => {
    const { Api, ErrorHandler } = services;
    dispatch(baseAction(types.GET_COUNTRY_LIST_LOADED, false));
    try {
      const countries = await Api.getCountries(token, params);
      dispatch(baseAction(types.GET_COUNTRIES, countries));
      dispatch(baseAction(types.GET_COUNTRY_LIST_LOADED, true));
      return countries;
    } catch (err) {
      dispatch(baseAction(types.GET_COUNTRY_LIST_LOADED, true));
      return dispatch(ErrorHandler.addErrorToQueue(err));
    }
  };
}

const insertAirports = (token, params = {}) => async (dispatch, getState, services) => {
  const { Api, ErrorHandler } = services;
  try {
    return await Api.insertAirports(token, params);
  } catch (err) {
    dispatch(ErrorHandler.addErrorToQueue(err));
    return err.response;
  }
};

const updateAirports = (token, params = {}) => async (dispatch, getState, services) => {
  const { Api, ErrorHandler } = services;
  try {
    return await Api.updateAirports(token, params);
  } catch (err) {
    dispatch(ErrorHandler.addErrorToQueue(err));
    return err.response;
  }
};

export default {
  getAirports,
  getCountries,
  insertAirports,
  updateAirports,
};
