import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './i18n';

// eslint-disable-next-line
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
