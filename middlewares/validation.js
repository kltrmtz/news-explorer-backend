// middleware/validation.js

const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// 1. The article card body when an card is created
// The card keyword is a required string of between 2 and 30 characters.

module.exports.validateArticleCardBodyCreate = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "keyword" field must be filled in',
    }),
    title: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "title" field must be filled in',
    }),
    text: Joi.string().required().min(2).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.empty": 'The "text" field must be filled in',
    }),
    date: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "date" field must be filled in',
    }),
    source: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "source" field must be filled in',
    }),
    link: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "link" field must be filled in',
      "string.uri": 'The "link" field must be a valid url',
    }),
    image: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "image" field must be filled in',
      "string.uri": 'The "image" field must be a valid url',
    }),
    owner: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "owner" field must be filled in',
    }),
  }),
});

// 2. The user info body when a user is created
// The user name is a string of between 2 and 30 characters.
// Email is a required string in a valid email format.
// Password is a required string.

module.exports.validateUserBodyCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length of the "name" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// 3. Authentication when a user logs in
// Email is a required string in a valid email format.
// Password is a required string.

module.exports.validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length of the "name" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// 4. User and article card IDs when they are accessed
// IDs must be a hexadecimal value length of 24 characters.

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24).messages({
      "string.hex": "ID must be hexadecimal",
      "string.length": "ID must be length of 24 characters",
    }),
  }),
});

// 5. Update User info

module.exports.validateUserBodyUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
  }),
});
