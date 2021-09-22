import types from './types';
import loaderTypes from '../loader/types';

const baseAction = (action, payload = {}) => ({ type: action, payload });

function getSites(token, params = {}) {
  return async (dispatch, getState, services) => {
    const { Api, ErrorHandler } = services;
    dispatch(baseAction(loaderTypes.IS_LOADER, true));

    try {
      const sites = await Api.getSites(token, params);
      dispatch(baseAction(types.GET_SITES_LIST, sites));
      dispatch(baseAction(loaderTypes.IS_LOADER, false));
      return sites;
    } catch (err) {
      dispatch(baseAction(loaderTypes.IS_LOADER, false));
      return dispatch(ErrorHandler.addErrorToQueue(err));
    }
  };
}

const getReport = (token, params = {}) => async (dispatch, getState, services) => {
  const { Api, ErrorHandler } = services;
  try {
    return await Api.getReports(token, params);
  } catch (err) {
    return dispatch(ErrorHandler.addErrorToQueue(err));
  }
};

export default {
  getSites,
  getReport,
};
