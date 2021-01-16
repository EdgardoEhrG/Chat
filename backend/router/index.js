const router = require("express").Router();

const { login, register } = require("../controllers/auth");
const { update } = require("../controllers/user");
const { index, create, messages, deleteChat } = require("../controllers/chat");

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

// ---- Chats

router.get("/chats", [auth], index);
router.post("/chats/create", [auth], create);
router.delete("/chats/:id", [auth], deleteChat);
router.get("/messages", [auth], messages);

module.exports = router;
