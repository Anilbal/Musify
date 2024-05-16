const { check, validationResult } = require("express-validator");

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

exports.userCheck = [
  check("username", "Username is required")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("username must be at least 3 characters"),
  check("email", "Email is required")
    .notEmpty()
    .isEmail()
    .withMessage("Email format incorrect"),
  check("password", "Password is required")
    .notEmpty()
    .matches(/[a-z]/)
    .withMessage("password must conatin at least one lowercase")
    .matches(/[A-Z]/)
    .withMessage("password must conatin at least one uppercase ")
    .matches(/[0-9]/)
    .withMessage("password must conatin at least one number")
    .matches(/[*\-*!@#$]/)
    .withMessage("password must conatin at least one special characters")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters"),
];
