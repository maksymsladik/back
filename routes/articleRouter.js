const Router = require("express");
const passport = require("passport");
const router = new Router();
const {
  getArticles,
  getWriterArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  deleteArticles,
} = require("../controllers/articleController");

router.get("/articles", getArticles);

router.get(
  "/my-articles",
  passport.authenticate("jwt", { session: false }),
  getWriterArticles
);

router.get(
  "/articles/:id",
  passport.authenticate("jwt", { session: false }),
  getArticle
);

router.post(
  "/my-articles",
  passport.authenticate("jwt", { session: false }),
  createArticle
);

router.patch(
  "/articles/:id",
  passport.authenticate("jwt", { session: false }),
  updateArticle
);

router.delete(
  "/my-articles/:id",
  passport.authenticate("jwt", { session: false }),
  deleteArticle
);

router.delete(
  "/my-articles",
  passport.authenticate("jwt", { session: false }),
  deleteArticles
);

module.exports = router;
