import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as serviceWorker from './serviceWorker';
import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/ie9';
import './assets/css/common.css';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
