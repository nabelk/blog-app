const router = require("express").Router();
const authController = require("../controllers/authController");
const passport = require("passport");

const jwtAuth = passport.authenticate("jwt", { session: false });

router.post("/login", authController.login);
router.post("/create-post", jwtAuth, authController.createPost);
router.patch(
  "/posts/updatestatus/:id",
  jwtAuth,
  authController.updatePostStatus
);

module.exports = router;
