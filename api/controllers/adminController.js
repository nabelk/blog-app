const prisma = require("../prisma/queries");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await prisma.findAdmin(email);

  if (!admin) return res.status(400).json({ msg: "Invalid email." });

  const validPassword = await bcrypt.compare(password, admin.password);

  if (!validPassword) return res.status(400).json({ msg: "Invalid password." });

  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1hr",
    }
  );

  res.json({ token });
};

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

const createPost = async (req, res) => {
  const { title, content, tag } = req.body;
  const cleanTagsArr = tag.split(",").map((tag) => tag.trim());

  try {
    const post = await prisma.createPost(title, content, cleanTagsArr);
    return res.status(201).json({
      success: true,
      msg: "Post created successfully",
      post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: err.message,
    });
  }
};

const updatePostStatus = async (req, res) => {
  let { status } = req.body;
  let { id } = req.params;
  id = Number(id);

  try {
    const postStatus = await prisma.updatePostStatus(id, status);
    return res.status(201).json({
      success: true,
      msg: `Post '${postStatus.title}' status updated succesfully`,
      postStatus,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Failed to update post status`,
      error: err.message,
    });
  }
};

const updatePost = async (req, res) => {
  let { title, content, tag } = req.body;
  let { id } = req.params;
  id = Number(id);
  const cleanTagsArr = tag.split(",").map((tag) => tag.trim());

  try {
    const postUpdate = await prisma.updatePost(
      id,
      title,
      content,
      cleanTagsArr
    );
    return res.status(201).json({
      success: true,
      msg: `Post '${postUpdate.title}' updated succesfully`,
      postUpdate,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete post`,
      error: err.message,
    });
  }
};

const deletePost = async (req, res) => {
  let { id } = req.params;
  id = Number(id);

  try {
    const deletePost = await prisma.deletePost(id);
    return res.status(201).json({
      success: true,
      msg: `Post '${deletePost.title}' deleted succesfully`,
      deletePost,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete post`,
      error: err.message,
    });
  }
};

module.exports = {
  login,
  createPost,
  updatePostStatus,
  updatePost,
  deletePost,
  getPosts,
};
