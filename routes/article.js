const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
} = require("../controllers/articleCards");
const { auth } = require("../middlewares/auth");
const {
  validateArticleCardBodyCreate,
  validateId,
} = require("../middlewares/validation");

router.use(auth);

router.get("/", getCards);

router.post("/", validateArticleCardBodyCreate, createCard);
router.delete("/:cardId", validateId, deleteCard);

module.exports = router;

// GET /cards — returns all article cards
// POST /cards — creates a new card
// DELETE /cards/:cardId — deletes a card by _id
