const Router = require("express");
const passport = require("passport");
const router = new Router();
const {
  register,
  login,
  check,
  writers,
  deleteWriter,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/check", passport.authenticate("jwt", { session: false }), check);
router.get("/writers", writers);
router.delete("/writers/:id", deleteWriter);

module.exports = router;
