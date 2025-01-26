const router = require("express").Router();
const clientController = require("../controllers/clientController");
const createCommentValidator = require("../validators/commentValidator");

router.get("/post/all", clientController.getPosts);
router.get("/tag/all", clientController.getTags);
router.get("/post/:id", clientController.getPost);
router.get("/post/tag/:tagId", clientController.getPostsByTag);
router.post(
  "/comment/create/:postId",
  createCommentValidator,
  clientController.createCommentInPost
);

module.exports = router;
