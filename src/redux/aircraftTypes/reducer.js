import types from './types';

const initialState = {
  aircraftTypes: [],
};

const getAircraftTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_AIRCROFT_TYPES:
      return {
        ...state,
        aircraftTypes: action.payload,
      };

    default:
      return state;
  }
};

export default getAircraftTypeReducer;
