class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "HTTP_BAD_REQUEST";
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
