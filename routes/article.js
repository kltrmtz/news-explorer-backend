const router = require("express").Router();
const {
  getCards,
  createCard,
  saveCard,
  // unsaveCard,
  deleteCard,
} = require("../controllers/articleCards");
const { auth } = require("../middlewares/auth");
const {
  validateArticleCardBodyCreate,
  validateId,
} = require("../middlewares/validation");

router.get("/", getCards);

router.use(auth);

router.post("/", validateArticleCardBodyCreate, createCard);
router.put("/:cardId/saves", validateId, saveCard);
// router.delete("/:cardId/saves", validateId, unsaveCard);
router.delete("/:cardId", validateId, deleteCard);

module.exports = router;

// GET /cards — returns all article cards
// POST /cards — creates a new card
// PUT /cards/:cardId/saves — save a card
// DELETE /cards/:cardId/saves — unsave a card
// DELETE /cards/:cardId — deletes a card by _id
