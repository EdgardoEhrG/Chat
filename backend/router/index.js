const router = require("express").Router();

const { login, register } = require("../controllers/auth");
const { validate } = require("../helpers/validator");
const { registrationRules, loginRules } = require("../helpers/register");

// ---- Auth

router.post("/login", [loginRules, validate], login);

router.post("/register", [registrationRules, validate], register);

// ---- Other

router.get("/home", (req, res) => {
  res.send("Home page");
});

module.exports = router;
