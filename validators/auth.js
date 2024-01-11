const { check } = require("express-validator");

exports.userSignupValidator = [
  check("firstname").not().isEmpty().withMessage("First Name is required"),
  check("lastname").not().isEmpty().withMessage("Last Name is required"),
  check("role").not().isEmpty().withMessage("role is required"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least  6 characters long"),
];

exports.userSigninValidator = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least  6 characters long"),
];
