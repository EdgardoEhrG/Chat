const router = require("express").Router();

const { login, register } = require("../controllers/auth");
const { update, search } = require("../controllers/user");
const {
  index,
  create,
  messages,
  deleteChat,
  imageUpload,
  addUserToGroup,
  leaveCurrentChat,
} = require("../controllers/chat");

const { validate } = require("../helpers/validator");
const { registrationRules } = require("../helpers/register");
const { loginRules } = require("../helpers/login");
const { updateRules } = require("../helpers/update");

const { auth } = require("../middleware/auth");
const { userFile, chatFile } = require("../middleware/upload");

// ---- Auth

router.post("/login", [loginRules, validate], login);
router.post("/register", [registrationRules, validate], register);

// ---- User

router.post("/users", [auth, userFile, updateRules, validate], update);
router.get("/search-users"[auth], search);

// ---- Chats

router.get("/chats", [auth], index);
router.get("/messages", [auth], messages);
router.post("/chats/create", [auth], create);
router.post("/chats/upload-image", [auth, chatFile], imageUpload);
router.post("/chats/add-user-to-group", [auth], addUserToGroup);
router.post("/chats/leave-current-chat", [auth], leaveCurrentChat);
router.delete("/chats/:id", [auth], deleteChat);

module.exports = router;
