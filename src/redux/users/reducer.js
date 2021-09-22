import types from './types';

const initialState = {
  roles: [],
  users: [],
  siteListLoaded: false,
  userListLoaded: false,
  roleListLoaded: false,
  lastLoggedInUser: {},
};

const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case types.GET_SITES:
      return {
        ...state,
        sites: action.payload,
      };
    case types.UPDATE_LAST_LOGGED_IN_TIME:
      return {
        ...state,
        lastLoggedInUser: action.payload,
      };
    case types.GET_SITE_LIST_LOADED:
      return {
        ...state,
        siteListLoaded: action.payload,
      };
    case types.GET_ROLE_LIST_LOADED:
      return {
        ...state,
        roleListLoaded: action.payload,
      };
    default:
      return state;
  }
};

export default getUserReducer;
