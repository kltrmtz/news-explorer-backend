class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "HTTP_UNAUTHORIZED";
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
