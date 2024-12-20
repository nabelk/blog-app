const prisma = require("../prisma/queries");

const getPosts = async (req, res) => {
  try {
    const posts = await prisma.getPosts();
    return res.status(201).json({
      success: true,
      msg: "Posts successfully fetched",
      posts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get all post",
      error: err.message,
    });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.getPost(Number(id));
    return res.status(201).json({
      success: true,
      msg: `Post '${post.title}' successfully fetched`,
      post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch post",
      error: err.message,
    });
  }
};

const getTags = async (req, res) => {
  try {
    const tags = await prisma.getTags();
    return res.status(201).json({
      success: true,
      msg: `Tags successfully fetched`,
      tags,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tags",
      error: err.message,
    });
  }
};

const createCommentInPost = async (req, res) => {
  const { name, comment } = req.body;
  let { postId } = req.params;
  postId = Number(postId);

  try {
    const addComment = await prisma.createCommentInPost(postId, name, comment);
    return res.status(201).json({
      success: true,
      msg: `Comment successfully created on post ${postId}`,
      comment: addComment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create comment",
      error: err.message,
    });
  }
};

module.exports = { getPosts, getPost, getTags, createCommentInPost };
