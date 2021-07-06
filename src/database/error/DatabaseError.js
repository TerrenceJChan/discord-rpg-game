const ERROR_CODES = new Map();

export default class DatabaseError extends Error {
  static define(code, ErrorClass) {
    ERROR_CODES.set(code, ErrorClass);
  }

  static create(error) {
    return new (ERROR_CODES.get(error.code) ?? DatabaseError)(error);
  }

  constructor(error) {
    super(error.message);
    Object.assign(this, error);
    this.name = this.constructor.name;
  }
}
