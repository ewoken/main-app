import ExtendableError from 'es6-error';

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
    }
    throw error;
  };
}
