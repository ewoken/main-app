import { USER_STORE_URL } from '../../config';

export async function signUp(user) {
  // TODO utils
  const result = await fetch(`${USER_STORE_URL}/users/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const body = await result.json();
  if (!result.ok) {
    throw new Error(`${result.status} ${result.statusText} ${body.error}`);
  }
  return body;
}

export const plop = 1;
