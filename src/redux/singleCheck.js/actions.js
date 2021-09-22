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

export default {
  getShellList,
};
