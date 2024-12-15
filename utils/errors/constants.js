const HTTP_BAD_REQUEST = "Cast Error, Validation Error, Assertion Error";
const HTTP_UNAUTHORIZED = "Unauthorized Error";
const HTTP_FORBIDDEN = "Forbidden Error";
const HTTP_NOT_FOUND = "Document Not Found Error";
const HTTP_USER_DUPLICATED = "Duplicate Error";
const HTTP_INTERNAL_SERVER_ERROR = "Default Error";

module.exports = {
  HTTP_BAD_REQUEST,
  HTTP_UNAUTHORIZED,
  HTTP_FORBIDDEN,
  HTTP_NOT_FOUND,
  HTTP_USER_DUPLICATED,
  HTTP_INTERNAL_SERVER_ERROR,
};

// module.exports = {
//   HTTP_BAD_REQUEST: 400, // CastError, ValidationError, AssertionError

//   HTTP_UNAUTHORIZED: 401, // UnauthorizedError

//   HTTP_FORBIDDEN: 403, // ForbiddenError

//   HTTP_NOT_FOUND: 404, // DocumentNotFoundError

//   HTTP_USER_DUPLICATED: 409, // DuplicateError

//   HTTP_INTERNAL_SERVER_ERROR: 500, // DefaultError
// };
