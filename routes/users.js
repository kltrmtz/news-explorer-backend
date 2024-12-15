const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const { validateUserBodyUpdate } = require("../middlewares/validation");

router.use(auth);

router.get("/me", getCurrentUser);
router.patch("/me", validateUserBodyUpdate);

module.exports = router;
