import types from './types';

const initialState = {
  errors: [],
  isErrorModalOpen: false,
  isAccessPageOpen: false,
};

const errorHandlerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PUSH_ERROR:
      return {
        ...state,
        errors: state.errors.concat([action.error]),
        isErrorModalOpen: true,
      };

    case types.REMOVE_ERROR:
      return {
        ...state,
        errors: [],
        isErrorModalOpen: false,
      };
    case types.IS_PAGE_ACCESS:
      return {
        ...state,
        isAccessPageOpen: action.value,
      };

    default:
      return state;
  }
};

export default errorHandlerReducer;
