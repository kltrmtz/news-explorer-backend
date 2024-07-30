class DuplicateError extends Error {
  constructor(message) {
    super(message);
    this.name = "HTTP_USER_DUPLICATED";
    this.statusCode = 409;
  }
}

module.exports = DuplicateError;
