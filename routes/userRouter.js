const Router = require("express");
const passport = require("passport");
const router = new Router();
const {
  register,
  login,
  check,
  writer,
  deleteWriter,
} = require("../controllers/userController");

router.post("/register", register);

router.post("/login", login);

router.get("/check", passport.authenticate("jwt", { session: false }), check);

router.get("/writer", passport.authenticate("jwt", { session: false }), writer);

router.delete(
  "/writers/:id",
  passport.authenticate("jwt", { session: false }),
  deleteWriter
);

module.exports = router;
