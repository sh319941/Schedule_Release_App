import types from './types';
import loaderTypes from '../loader/types';

const baseAction = (action, payload = {}) => ({ type: action, payload });

function getRoles(token, params = {}) {
  return async (dispatch, getState, services) => {
    const { Api, ErrorHandler } = services;
    dispatch(baseAction(types.GET_ROLE_LIST_LOADED, false));
    try {
      const roles = await Api.getRoles(token, params);
      dispatch(baseAction(types.GET_ROLES, roles));
      dispatch(baseAction(types.GET_ROLE_LIST_LOADED, true));
      return roles;
    } catch (err) {
      dispatch(baseAction(types.GET_ROLE_LIST_LOADED, true));
      return dispatch(ErrorHandler.addErrorToQueue(err));
    }
  };
}

function getSites(token, params = {}) {
  return async (dispatch, getState, services) => {
    const { Api, ErrorHandler } = services;
    dispatch(baseAction(types.GET_SITE_LIST_LOADED, false));

    try {
      const sites = await Api.getSites(token, params);
      dispatch(baseAction(types.GET_SITES, sites));
      dispatch(baseAction(types.GET_SITE_LIST_LOADED, true));
      return sites;
    } catch (err) {
      dispatch(baseAction(types.GET_SITE_LIST_LOADED, true));
      return dispatch(ErrorHandler.addErrorToQueue(err));
    }
  };
}

function getUsers(token, params = {}) {
  return async (dispatch, getState, services) => {
    const { Api, ErrorHandler } = services;
    try {
      const users = await Api.getUsers(token, params);
  
      dispatch(baseAction(types.GET_USERS, users));
      return users;
    } catch (err) {
      dispatch(ErrorHandler.addErrorToQueue(err));
      return err.response;
    }
  };
}

const insertUsers = (token, params = {}) => async (dispatch, getState, services) => {
  const { Api, ErrorHandler } = services;
  dispatch(baseAction(loaderTypes.IS_LOADER, true));
  try {
    const usersInsert = await Api.insertUser(token, params);
    dispatch(baseAction(loaderTypes.IS_LOADER, false));
    return usersInsert;
  } catch (err) {
    dispatch(ErrorHandler.addErrorToQueue(err));
    dispatch(baseAction(loaderTypes.IS_LOADER, false));
    return err.response;
  }
};

const updateUsers = (token, params = {}) => async (dispatch, getState, services) => {
  const { Api, ErrorHandler } = services;
  dispatch(baseAction(loaderTypes.IS_LOADER, true));
  try {
    const users = await Api.updateUser(token, params);
    dispatch(baseAction(loaderTypes.IS_LOADER, false));
    return users;
  } catch (err) {
    dispatch(ErrorHandler.addErrorToQueue(err));
    dispatch(baseAction(loaderTypes.IS_LOADER, false));
    return err.response;
  }
};

function updateLastLoggedIn(token, params) {
  return async (dispatch, getState, services) => {
    const { Api, ErrorHandler } = services;
    dispatch(baseAction(loaderTypes.IS_LOADER, true));
    try {
      await Api.updateLastLoggedIn(token, params);
      dispatch(baseAction(types.UPDATE_LAST_LOGGED_IN_TIME, params));
      dispatch(baseAction(loaderTypes.IS_LOADER, false));
    } catch (err) {
      dispatch(baseAction(loaderTypes.IS_LOADER, false));
      dispatch(ErrorHandler.addErrorToQueue(err));
      return err.response;
    }
  };
}

export const userInformation = (data) => (dispatch) => {
  dispatch({ type: 'GetUser', payload: data });
};
export default {
  getRoles,
  getUsers,
  updateLastLoggedIn,
  insertUsers,
  updateUsers,
  getSites,
};
