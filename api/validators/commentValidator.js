const { body, param } = require("express-validator");

const validateCreateComment = [
  param("postId")
    .isInt({ min: 1 })
    .withMessage("Post ID must be a positive integer"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters")
    .escape(),
  body("comment")
    .trim()
    .notEmpty()
    .withMessage("Comment is required")
    .isLength({ max: 500 })
    .withMessage("Comment must be less than 500 characters")
    .escape(),
];

module.exports = validateCreateComment;
