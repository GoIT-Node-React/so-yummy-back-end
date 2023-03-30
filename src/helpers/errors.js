class BaseError extends Error {
  constructor(message) {
    super(message);
    this._code = 500;
    this._status = 'fail';
    this._data = 'Internal server error';
  }

  get code() {
    return this._code;
  }
  get status() {
    return this._status;
  }
  get data() {
    return this._data;
  }
}

class ValidationError extends BaseError {
  constructor(message) {
    super(message);

    this._code = 400;
    this._status = 'error';
    this._data = 'Validation error';
  }
}

class NotFoundError extends BaseError {
  constructor(message) {
    super(message);
    this._code = 404;
    this._status = 'error';
    this._data = 'Not found';
  }
}

class RouteNotFoundError extends BaseError {
  constructor() {
    super(`Route note found`);

    this._code = 404;
    this._status = 'error';
    this._data = 'Not found';
  }
}

class DatabaseError extends BaseError {
  constructor(message) {
    super(message);
    this._code = 409;
    this._status = 'error';
    this._data = 'Conflict';
  }
}

class UnAuthorizedError extends BaseError {
  constructor(message) {
    super(message);
    this._code = 401;
    this._status = 'error';
    this._data = 'Unauthorized';
  }
}

class ServerError extends BaseError {
  constructor(message) {
    super(message);
    this._code = 500;
    this._status = 'fail';
    this._data = 'Internal Server Error';
  }
}

module.exports = {
  BaseError,
  DatabaseError,
  NotFoundError,
  RouteNotFoundError,
  ServerError,
  UnAuthorizedError,
  ValidationError,
};
