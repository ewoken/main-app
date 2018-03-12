import ExtendableError from 'es6-error';
import { SubmissionError } from 'redux-form';

export { SubmissionError } from 'redux-form';

export class DefaultError extends ExtendableError {
  constructor(message, payload) {
    super(message);
    this.payload = payload;
  }

  toObject() {
    return {
      message: this.message,
      payload: this.payload,
    };
  }
}

export class ApiError extends DefaultError {}
export class ServerError extends ApiError {}
export class ValidationError extends ApiError {}

export class DomainError extends ApiError {
  constructor(
    message = '',
    errorCode = DomainError.ERROR_CODE,
    payload = null,
  ) {
    super(message, payload);
    this.errorCode = errorCode;
  }

  static get ERROR_CODE() {
    return 'DOMAIN_ERROR';
  }

  static fromObject(object) {
    const { message, errorCode, payload = null } = object;

    if (
      typeof message !== 'string' ||
      typeof errorCode !== 'string' ||
      typeof payload !== 'object'
    ) {
      throw new ApiError('Bad error object', object);
    }

    return new DomainError(message, errorCode, payload);
  }

  toObject() {
    return {
      message: this.message,
      payload: this.payload,
      errorCode: this.errorCode,
    };
  }
}

export function only(SpecificError, handler) {
  return function onlyHandler(error) {
    if (error instanceof SpecificError) {
      return handler(error);
    }
    throw error;
  };
}

export function handleApiError(handler) {
  return function apiErrorHandler(error) {
    if (error instanceof ApiError) {
      console.error('API error', error); // eslint-disable-line no-console
      handler(error.toObject());
    } else {
      throw error;
    }
  };
}

export function handleSubmitError(t, handler) {
  return function submitErrorHandler(error) {
    // TODO
    if (error instanceof ApiError) {
      console.error('API error', error); // eslint-disable-line no-console
    }
    if (handler && error instanceof DomainError) {
      handler(error.toObject());
    } else if (error instanceof ApiError) {
      throw new SubmissionError({
        _error: {
          message: t('Something goes wrong'),
          description: error.message,
          type: 'error',
        },
      });
    }
    throw error;
  };
}
