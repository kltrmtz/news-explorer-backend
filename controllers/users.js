const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");

const BadRequestError = require("../utils/errors/badRequestError");
const UnauthorizedError = require("../utils/errors/unauthorizedError");
const NotFoundError = require("../utils/errors/notFoundError");
const DuplicateError = require("../utils/errors/duplicateError");

const {
  HTTP_BAD_REQUEST,
  HTTP_UNAUTHORIZED,
  HTTP_NOT_FOUND,
  HTTP_USER_DUPLICATED,
} = require("../utils/errors/constants");

// POST /users

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email) {
    res.status(BadRequestError).send({ message: HTTP_BAD_REQUEST });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        const error = new Error(HTTP_USER_DUPLICATED);
        error.statusCode = DuplicateError;
        throw error;
      }

      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      }),
    )
    .then((user) =>
      res.status(201).send({
        name: user.name,
        email: user.email,
      }),
    )

    .catch((err) => {
      if (err.statusCode === DuplicateError) {
        next(new DuplicateError(HTTP_USER_DUPLICATED));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError(HTTP_BAD_REQUEST));
      }
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(HTTP_NOT_FOUND));
      } else {
        next(err);
      }
    });
};

// UserLogin
const userLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    // res.status(BadRequestError).send({ message: "Invalid data" });
    next(new BadRequestError(HTTP_BAD_REQUEST));
    return;
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(HTTP_BAD_REQUEST));
      }
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError(HTTP_UNAUTHORIZED));
      } else {
        next(err);
      }
    });
};

// GET currentUser

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(HTTP_BAD_REQUEST));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError(HTTP_BAD_REQUEST));
      }
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(HTTP_NOT_FOUND));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  userLogin,
  getCurrentUser,
};
