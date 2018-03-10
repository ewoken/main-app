import { USER_STORE_URL } from '../../config';
import fetchApi from '../../utils/fetchApi';

function fetchUserStore(url, options) {
  return fetchApi(`${USER_STORE_URL}${url}`, options);
}

export function signUp(user) {
  return fetchUserStore('/users/signUp', {
    method: 'POST',
    body: JSON.stringify(user),
  });
}

export function logIn(credentials) {
  return fetchUserStore('/users/logIn', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export function getLoggedUser() {
  return fetchUserStore('/users/me', {
    method: 'GET',
  });
}
