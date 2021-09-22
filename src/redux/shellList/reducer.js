import types from './types';

const initialState = {
  shellList: [],
};

const geShellListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SHELL_LIST:
      return {
        ...state,
        shellList: action.payload,
      };

    default:
      return state;
  }
};

export default geShellListReducer;
