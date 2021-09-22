import types from './types';

const initialState = {
  sitesList: [],
};

const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SITES_LIST:
      // eslint-disable-next-line no-case-declarations
      const siteList = [{ siteId: 'All', siteName: 'All' }, ...action.payload];
      return {
        ...state,

        sitesList: siteList,
      };
    case types.GET_SITE_LIST_LOADED:
      return {
        ...state,
        siteListLoaded: action.payload,
      };

    default:
      return state;
  }
};

export default getUserReducer;
