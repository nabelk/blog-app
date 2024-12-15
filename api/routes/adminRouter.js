const router = require("express").Router();
const adminController = require("../controllers/adminController");
const passport = require("passport");

const jwtAuth = passport.authenticate("jwt", { session: false });

router.post("/login", adminController.login);
router.post("/create-post", jwtAuth, adminController.createPost);
router.patch(
  "/posts/updatestatus/:id",
  jwtAuth,
  adminController.updatePostStatus
);
router.put("/posts/update/:id", jwtAuth, adminController.updatePost);
router.delete("/posts/:id", jwtAuth, adminController.deletePost);
router.get("/posts/all", jwtAuth, adminController.getPosts);

module.exports = router;
