import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { reducer as formReducer } from 'redux-form';

import createHistory from 'history/createHashHistory';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

const rootReducer = combineReducers({
  // ...reducers,
  router: routerReducer,
  form: formReducer,
});

const middlewares = [routerMiddleware(history)];
const enhancers = [applyMiddleware(...middlewares)];
const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const enhancer = composeEnhancers(...enhancers);

const store = createStore(rootReducer, enhancer);

export default store;
