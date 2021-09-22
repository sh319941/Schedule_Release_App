import React, { Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppInsightsContext } from '@microsoft/applicationinsights-react-js';
import { configureStore } from './redux';
import './App.css';
import './i18n';
import './assets/css/common.css';
import Loader from './component/common/Utilities/Loader';
import 'react-app-polyfill/stable';
import Routes from './routes';
import ErrorStack from './component/errorHandler';
import ErrorBoundary from './component/errorHandler/ErrorBoundaryComponent';
import { reactPlugin } from './component/errorHandler/AppInsights';

const store = configureStore();
const App = () => {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('logout')) {
      localStorage.clear();
      window.location.href = '/';
    }
  }, []);

  return (
    <Provider store={store}>
      <React.StrictMode>
        <Suspense fallback={<Loader />}>
          <ErrorStack />
          <ErrorBoundary>
            <AppInsightsContext.Provider value={reactPlugin}>
              <Routes />
            </AppInsightsContext.Provider>
          </ErrorBoundary>
        </Suspense>
      </React.StrictMode>
    </Provider>
  );
};
export default App;
