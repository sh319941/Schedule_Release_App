import types from './types';

const initialState = {
  isLoader: false,
};

const loaderReducer = (state = initialState, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case types.IS_LOADER:
      return {
        ...state,
        isLoader: action.payload,
      };
    default:
      return state;
  }
};

export default loaderReducer;
