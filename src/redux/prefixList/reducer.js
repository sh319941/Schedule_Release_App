import types from './types';

const initialState = {
  prefixList: [],
};

const gePrefixListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PREFIX_LIST:
      return {
        ...state,
        prefixList: action.payload,
      };

    default:
      return state;
  }
};

export default gePrefixListReducer;
