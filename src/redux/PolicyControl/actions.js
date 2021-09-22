import types from './types';

const baseAction = (action, payload = {}) => ({ type: action, payload });

function getUserDetails(token, params) {
  return async (dispatch, getState, services) => {
    const { Api, ErrorHandler } = services;
    try {
      const userDetails = await Api.getUserDetails(token, params);
      dispatch(baseAction(types.GET_USER_DETAILS, userDetails));
      return userDetails;
    } catch (err) {
      dispatch(
        baseAction(types.ERRORS, {
          isError: true,
          message: err.message,
        })
      );
      return dispatch(ErrorHandler.addErrorToQueue(err));
    }
  };
}

export default {
  getUserDetails,
};
