import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import ErrorHandler from '../Services/ErrorHandler';
import Api from '../Services/InternalApi';

import policyControl from './PolicyControl';
import scheduleCheck from './scheduleCheck';
import bulkCheck from './bulkCheck';
import users from './users';
import airports from './airports';
import sites from './sites';
import shellList from './shellList';
import countires from './countries';
import aircraftTypes from './aircraftTypes';
import prefixList from './prefixList';
import report from './report';
import errorHandler from './errorHandler';
import loader from './loader';

export const rootReducer = combineReducers({
  [policyControl.name]: policyControl.reducer,
  [scheduleCheck.name]: scheduleCheck.reducer,
  [bulkCheck.name]: bulkCheck.reducer,
  [users.name]: users.reducer,
  [airports.name]: airports.reducer,
  [sites.name]: sites.reducer,
  [shellList.name]: shellList.reducer,
  [countires.name]: countires.reducer,
  [aircraftTypes.name]: aircraftTypes.reducer,
  [prefixList.name]: prefixList.reducer,
  [errorHandler.name]: errorHandler.reducer,
  [report.name]: report.reducer,
  [loader.name]: loader.reducer,
});

const middlewares = [thunk.withExtraArgument({ Api, ErrorHandler })];

export const configureStore = () => {
  const composeEnhancers = composeWithDevTools({});

  return createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
};
