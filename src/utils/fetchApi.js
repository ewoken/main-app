import { mergeDeepRight } from 'ramda';
import {
  DefaultError,
  ServerError,
  DomainError,
  ValidationError,
} from '../utils/errors';

const BAD_JSON = 'BAD_JSON';
const VALIDATION_ERROR = 'VALIDATION_ERROR';

/**
 * Fetch an url
 * TODO  common with back
 * @param {String} url
 * @param {Object} options
 */
async function fetchApi(url, options) {
  const mergedOptions = mergeDeepRight(
    {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    options,
  );
  const result = await fetch(url, mergedOptions);
  if (!result.ok) {
    if (result.status === 400) {
      const body = await result.json();
      switch (body.error.errorCode) {
        case BAD_JSON:
          throw new DefaultError('Bad json', options.body);
        case VALIDATION_ERROR:
          throw new ValidationError('Validation error', body.error.payload);
        default:
          throw DomainError.fromObject(body.error);
      }
    } else {
      throw new ServerError(`${result.status} ${result.statusText}`);
    }
  }
  return result.json();
}

export default fetchApi;
