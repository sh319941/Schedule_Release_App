import types from './types';
import loaderTypes from '../loader/types';

const baseAction = (action, payload = {}) => ({ type: action, payload });

function getSites(token, params = {}) {
  return async (dispatch, getState, services) => {
    const { Api, ErrorHandler } = services;
    try {
      const sites = await Api.getSites(token, params);
      dispatch(baseAction(types.GET_SITES, sites));
      dispatch(baseAction(loaderTypes.IS_LOADER, false));
      return sites;
    } catch (err) {
      return dispatch(ErrorHandler.addErrorToQueue(err));
    }
  };
}
function getAirports(token, params = {}) {
  return async (dispatch, getState, services) => {
    const { Api, ErrorHandler } = services;
    dispatch(baseAction(types.GET_AIRPORT_LIST_LOADED, false));

    try {
      const airports = await Api.getAirports(token, params);
      dispatch(baseAction(types.GET_AIRPORTS_LIST, airports));
      dispatch(baseAction(types.GET_AIRPORT_LIST_LOADED, true));
      return airports;
    } catch (err) {
      dispatch(baseAction(types.GET_AIRPORT_LIST_LOADED, true));
      return dispatch(ErrorHandler.addErrorToQueue(err));
    }
  };
}

const insertSites = (token, params = {}) => async (dispatch, getState, services) => {
  const { Api, ErrorHandler } = services;
  dispatch(baseAction(loaderTypes.IS_LOADER, true));
  try {
    const sitesInsert = await Api.insertSites(token, params);
    dispatch(baseAction(loaderTypes.IS_LOADER, false));
    const sites = await Api.getSites(token);
    dispatch(baseAction(types.GET_SITES, sites));
    return sitesInsert;
  } catch (err) {
    dispatch(ErrorHandler.addErrorToQueue(err));
    dispatch(baseAction(loaderTypes.IS_LOADER, false));
    return err.response;
  }
};

const updateSites = (token, params = {}) => async (dispatch, getState, services) => {
  const { Api, ErrorHandler } = services;
  dispatch(baseAction(loaderTypes.IS_LOADER, true));
  try {
    const sitesUpdate = await Api.updateSites(token, params);
    dispatch(baseAction(loaderTypes.IS_LOADER, false));
    const sites = await Api.getSites(token);
    dispatch(baseAction(types.GET_SITES, sites));
    return sitesUpdate;
  } catch (err) {
    dispatch(ErrorHandler.addErrorToQueue(err));
    dispatch(baseAction(loaderTypes.IS_LOADER, false));
    return err.response;
  }
};
export default {
  getSites,
  updateSites,
  getAirports,
  insertSites,
};
