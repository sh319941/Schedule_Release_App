import types from './types';
import loaderTypes from '../loader/types';

const baseAction = (action, payload = {}) => ({ type: action, payload });

function getShellList(token, params = {}) {
  return async (dispatch, getState, services) => {
    const { Api, ErrorHandler } = services;
    dispatch(baseAction(loaderTypes.IS_LOADER, true));

    try {
      const shellList = await Api.getShellList(token, params);
      dispatch(baseAction(types.GET_SHELL_LIST, shellList));
      dispatch(baseAction(loaderTypes.IS_LOADER, false));
      return shellList;
    } catch (err) {
      dispatch(baseAction(loaderTypes.IS_LOADER, false));
      return dispatch(ErrorHandler.addErrorToQueue(err));
    }
  };
}

const insertShellReg = (token, params = {}) => async (dispatch, getState, services) => {
  const { Api, ErrorHandler } = services;

  try {
    return await Api.insertShellList(token, params);
  } catch (err) {
    dispatch(ErrorHandler.addErrorToQueue(err));
    return err.response;
  }
};

const updateShellReg = (token, params = {}) => async (dispatch, getState, services) => {
  const { Api, ErrorHandler } = services;

  try {
    return await Api.updateShellList(token, params);
  } catch (err) {
    dispatch(ErrorHandler.addErrorToQueue(err));
    return err.response;
  }
};

export default {
  getShellList,
  insertShellReg,
  updateShellReg,
};
