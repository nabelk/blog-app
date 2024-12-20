const router = require("express").Router();
const clientController = require("../controllers/clientController");

router.get("/post/all", clientController.getPosts);
router.get("/tag/all", clientController.getTags);
router.get("/post/:id", clientController.getPost);
router.post("/comment/create/:postId", clientController.createCommentInPost);

module.exports = router;
