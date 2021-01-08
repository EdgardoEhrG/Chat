const router = require("express").Router();

const { login, register } = require("../controllers/auth");
const { update } = require("../controllers/user");

const { validate } = require("../helpers/validator");
const { registrationRules } = require("../helpers/register");
const { loginRules } = require("../helpers/login");
const { updateRules } = require("../helpers/update");

const { auth } = require("../middleware/auth");
const { userFile } = require("../middleware/upload");

// ---- Auth

router.post("/login", [loginRules, validate], login);

router.post("/register", [registrationRules, validate], register);

// ---- User

router.post("/users", [auth, userFile, updateRules, validate], update);

// ---- Other

router.get("/home", (req, res) => {
  res.send("Home page");
});

module.exports = router;
