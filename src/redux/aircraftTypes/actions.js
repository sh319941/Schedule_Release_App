import types from './types';
import loaderTypes from '../loader/types';

const baseAction = (action, payload = {}) => ({ type: action, payload });

function getAircraftTypes(token, params = {}) {
  return async (dispatch, getState, services) => {
    const { Api, ErrorHandler } = services;
    dispatch(baseAction(loaderTypes.IS_LOADER, true));
    try {
      const aircraftTypes = await Api.getAircraftTypes(token, params);
      dispatch(baseAction(types.GET_AIRCROFT_TYPES, aircraftTypes));
      dispatch(baseAction(loaderTypes.IS_LOADER, false));
      return aircraftTypes;
    } catch (err) {
      dispatch(baseAction(loaderTypes.IS_LOADER, false));
      return dispatch(ErrorHandler.addErrorToQueue(err));
    }
  };
}

const insertAircraft = (token, params = {}) => async (dispatch, getState, services) => {
  const { Api, ErrorHandler } = services;
  try {
    return await Api.insertAircraftTypes(token, params);
  } catch (err) {
    dispatch(ErrorHandler.addErrorToQueue(err));
    return err.response;
  }
};

const updateAircraft = (token, params = {}) => async (dispatch, getState, services) => {
  const { Api, ErrorHandler } = services;
  try {
    return await Api.updateAircraftTypes(token, params);
  } catch (err) {
    dispatch(ErrorHandler.addErrorToQueue(err));
    return err.response;
  }
};

export default {
  getAircraftTypes,
  insertAircraft,
  updateAircraft,
};
