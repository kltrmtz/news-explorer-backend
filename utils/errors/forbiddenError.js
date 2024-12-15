class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "HTTP_FORBIDDEN";
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
