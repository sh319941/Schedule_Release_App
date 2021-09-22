import types from './types';

const initialState = {
  singleCheck: [],
};

const geShellListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SINGLE_CHECK:
      return {
        ...state,
        singleCheck: action.payload,
      };

    default:
      return state;
  }
};

export default geShellListReducer;
