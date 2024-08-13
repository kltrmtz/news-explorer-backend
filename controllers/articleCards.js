const Card = require("../models/articleCard.js");

const BadRequestError = require("../utils/errors/badRequestError");
const ForbiddenError = require("../utils/errors/forbiddenError");
const NotFoundError = require("../utils/errors/notFoundError");

// GET /cards

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      next(err);
    });
};

// POST /cards

const createCard = (req, res, next) => {
  console.log(req.user._id);
  const { keyword, title, text, date, source, url, imageUrl } = req.body;
  const owner = req.user._id;
  Card.create({
    keyword,
    title,
    text,
    date,
    source,
    url,
    imageUrl,
    owner,
  })
    .then((card) => {
      console.log(card);
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

// PUT /cards/:cardId/saves — save a card

const saveCard = (req, res, next) => {
  console.log(req.params.cardId);
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { saves: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      }
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("No document found for query."));
      } else {
        next(err);
      }
    });
};

// DELETE /cards/:cardId/saves — unsave a card

// const unsaveCard = (req, res, next) => {
//   console.log(req.params.cardId);
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $pull: { likes: req.user._id } },
//     { new: true },
//   )
//     .orFail()
//     .then((card) => res.status(200).send({ data: card }))
//     .catch((err) => {
//       if (err.name === "CastError") {
//         next(new BadRequestError("Invalid data"));
//       }
//       if (err.name === "ValidationError") {
//         next(new BadRequestError("Invalid data"));
//       }
//       if (err.name === "DocumentNotFoundError") {
//         next(new NotFoundError("No document found for query."));
//       } else {
//         next(err);
//       }
//     });
// };

// DELETE /cards/:cardId

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id.toString()) {
        return next(
          new ForbiddenError(
            "You do not have not permission to access this resource.",
          ),
        );
      }

      return Card.findByIdAndDelete(cardId)
        .orFail()
        .then(() => res.status(200).send(card));
    })

    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      }
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("No document found for query."));
      } else {
        next(err);
      }
    });
};
module.exports = {
  getCards,
  createCard,
  saveCard,
  // unsaveCard,
  deleteCard,
};
