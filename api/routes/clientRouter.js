const router = require("express").Router();
const clientController = require("../controllers/clientController");
const createCommentValidator = require("../validators/commentValidator");

router.use((req, res, next) => {
  const token = req.headers.authorization;
  const origin = req.headers.origin || req.headers.referer;
  const allowedOrigins = [process.env.URL];

  // Must include a token.
  // To prevent from direct server call or other unauthorised server call.
  if (!origin) {
    if (token === `Bearer ${process.env.INTERNAL_TOKEN}`) {
      return next();
    }

    return res.status(401).json({ error: "Unauthorized. Token not provided" });
  }

  // Only allowed origin can access (for clien side call)
  const isAllowedOrigin = allowedOrigins.some((allowed) =>
    origin.startsWith(allowed)
  );

  if (!isAllowedOrigin) {
    return res.status(403).json({ error: "Forbidden origin" });
  }

  next();
});

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
