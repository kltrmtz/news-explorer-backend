const Card = require("../models/articleCard");

const BadRequestError = require("../utils/errors/badRequestError");
const ForbiddenError = require("../utils/errors/forbiddenError");
const NotFoundError = require("../utils/errors/notFoundError");

const {
  HTTP_BAD_REQUEST,
  HTTP_FORBIDDEN,
  HTTP_NOT_FOUND,
} = require("../utils/errors/constants");

// GET /cards

const getCards = (req, res, next) => {
  Card.find({ owner: req.user._id })
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      next(err);
    });
};

// POST /cards

const createCard = (req, res, next) => {
  console.log(req.user._id);
  const { keyword, title, text, date, source, link, image } = req.body;
  const owner = req.user._id;
  Card.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((card) => {
      console.log(card);
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(HTTP_BAD_REQUEST));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError(HTTP_BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

// DELETE /cards/:cardId

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id.toString()) {
        return next(new ForbiddenError(HTTP_FORBIDDEN));
      }

      return Card.findByIdAndDelete(cardId)
        .orFail()
        .then(() => res.status(200).send(card));
    })

    .catch((err) => {
      if (err.name === "CastError") {
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
  getCards,
  createCard,
  deleteCard,
};
