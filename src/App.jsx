import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import AppLayout from './components/AppLayout';
import './App.css';

import store, { history } from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppLayout />
        </ConnectedRouter>
      </Provider>
    </div>
  );
}

export default App;
