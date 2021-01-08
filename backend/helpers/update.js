const { body } = require("express-validator");

exports.updateRules = (() => {
  return [
    body("firstName").notEmpty(),
    body("lastName").notEmpty(),
    body("gender").notEmpty(),
    body("email").isEmail(),
    body("password").optional().isLength({ min: 5 }),
  ];
})();
