const getBulkCheck = (token, params) => async (dispatch, getState, services) => {
  const { Api, ErrorHandler } = services;
  try {
    return await Api.getBulkFlightCheck(token, params);
  } catch (err) {
    return dispatch(ErrorHandler.addErrorToQueue(err));
  }
};

export default {
  getBulkCheck,
};
