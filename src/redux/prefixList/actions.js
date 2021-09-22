import types from './types';
import loaderTypes from '../loader/types';

const baseAction = (action, payload = {}) => ({ type: action, payload });

function getPrefixList(token, params = {}) {
  return async (dispatch, getState, services) => {
    const { Api, ErrorHandler } = services;
    dispatch(baseAction(loaderTypes.IS_LOADER, true));
    try {
      const prefixList = await Api.getPrefixList(token, params);
      dispatch(baseAction(types.GET_PREFIX_LIST, prefixList));
      dispatch(baseAction(loaderTypes.IS_LOADER, false));
      return prefixList;
    } catch (err) {
      dispatch(baseAction(loaderTypes.IS_LOADER, false));
      return dispatch(ErrorHandler.addErrorToQueue(err));
    }
  };
}

const insertPrefix = (token, params = {}) => async (dispatch, getState, services) => {
  const { Api, ErrorHandler } = services;
  try {
    return await Api.insertPrefixList(token, params);
  } catch (err) {
    dispatch(ErrorHandler.addErrorToQueue(err));
    return err.response;
  }
};

const updatePrefix = (token, params = {}) => async (dispatch, getState, services) => {
  const { Api, ErrorHandler } = services;
  try {
    return await Api.upadtePrefixList(token, params);
  } catch (err) {
    dispatch(ErrorHandler.addErrorToQueue(err));
    return err.response;
  }
};

export default {
  getPrefixList,
  insertPrefix,
  updatePrefix,
};
