import types from './types';

const initialState = {
  userDetails: {},
  errors: {},
};

const getUserDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case types.ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default getUserDetailsReducer;
