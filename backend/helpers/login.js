const { body } = require("express-validator");

exports.loginRules = (() => {
  return [body("email").isEmail()];
})();
