import types from './types';
import loaderTypes from '../loader/types';

const baseAction = (action, payload = {}) => ({ type: action, payload });

function getCountries(token, params = {}) {
  return async (dispatch, getState, services) => {
    const { Api, ErrorHandler } = services;
    dispatch(baseAction(loaderTypes.IS_LOADER, true));
    dispatch(baseAction(types.GET_COUNTRIES_LOADED, false));
    try {
      const countries = await Api.getCountries(token, params);
      dispatch(baseAction(types.GET_COUNTRIES, countries));
      dispatch(baseAction(types.GET_COUNTRIES_LOADED, true));
      dispatch(baseAction(loaderTypes.IS_LOADER, false));
      return countries;
    } catch (err) {
      dispatch(baseAction(loaderTypes.IS_LOADER, false));
      dispatch(baseAction(types.GET_COUNTRIES_LOADED, true));
      return dispatch(ErrorHandler.addErrorToQueue(err));
    }
  };
}
const insertCountry = (token, params = {}) => async (dispatch, getState, services) => {
  const { Api, ErrorHandler } = services;
  try {
    return await Api.insertCountries(token, params);
  } catch (err) {
    dispatch(ErrorHandler.addErrorToQueue(err));
    return err.response;
  }
};

const updateCountry = (token, params = {}) => async (dispatch, getState, services) => {
  const { Api, ErrorHandler } = services;
  try {
    return await Api.updateCountries(token, params);
  } catch (err) {
    dispatch(ErrorHandler.addErrorToQueue(err));
    return err.response;
  }
};

export default {
  getCountries,
  insertCountry,
  updateCountry,
};
