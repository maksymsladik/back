const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const articleRouter = require("./articleRouter");

router.use("/auth", userRouter);
router.use("/app", articleRouter);

module.exports = router;
