import { getLoggedUser as getLoggedUserFromApi } from '../api/user-store/index';
import { handleApiError } from '../utils/errors';

const LOGGED_USER = 'LOGGED_USER';
const REQUEST_GET_LOGGED_USER = `${LOGGED_USER}/REQUEST`;
const RECEIVE_GET_LOGGED_USER = `${LOGGED_USER}/RECEIVE`;
const SET_LOGGED_USER = `${LOGGED_USER}/SET`;

function requestGetLoggedUser() {
  return { type: REQUEST_GET_LOGGED_USER };
}

function receiveGetLoggedUser(error, loggedUser) {
  return { type: RECEIVE_GET_LOGGED_USER, data: loggedUser, error };
}

export function setLoggedUser(user) {
  return { type: SET_LOGGED_USER, user };
}

const initialState = {
  data: null,
  loading: false,
  loaded: false,
  error: null,
};
export function loggedUserReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_GET_LOGGED_USER:
      return { ...state, loading: true };
    case RECEIVE_GET_LOGGED_USER:
      return {
        data: action.data,
        loading: false,
        loaded: true,
        error: action.error,
      };
    case SET_LOGGED_USER:
      return {
        ...state,
        data: action.user,
        loaded: true,
      };
    default:
      return state;
  }
}

export function loggedUserSelector(state) {
  return state.loggedUser.data;
}

export function isLoggedUserLoaded(state) {
  return state.loggedUser.loaded;
}

export function isLogged(state) {
  return !!loggedUserSelector(state);
}

export function getLoggedUser() {
  return function dispatchGetLoggedUser(dispatch, getState) {
    const state = getState();
    if (isLoggedUserLoaded(state)) {
      return Promise.resolve();
    }
    dispatch(requestGetLoggedUser());
    return getLoggedUserFromApi()
      .then(loggedUser => dispatch(receiveGetLoggedUser(null, loggedUser)))
      .catch(
        handleApiError(error => dispatch(receiveGetLoggedUser(error, null))),
      );
  };
}

/* export function getLoggedUserIsLoadingSelector(state) {
  return state.loggedUser.loading;
}

export function getLoggedUserErrorSelector(state) {
  return state.loggedUser.error;
} */
