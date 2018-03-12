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
signUp.EXISTING_EMAIL = 'EXISTING_EMAIL';

export function logIn(credentials) {
  return fetchUserStore('/users/logIn', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}
logIn.BAD_CREDENTIALS = 'BAD_CREDENTIALS';

export function getLoggedUser() {
  return fetchUserStore('/users/me', {
    method: 'GET',
  });
}

export function logOut() {
  return fetchUserStore('/users/logOut', {
    method: 'POST',
  });
}

export function sendResetPasswordEmail(input) {
  return fetchUserStore('/users/sendResetPasswordEmail', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function resetPassword(input) {
  return fetchUserStore('/users/resetPassword', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}
resetPassword.INVALID_EXPIRED_TOKEN = 'INVALID_EXPIRED_TOKEN';
