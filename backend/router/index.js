const router = require("express").Router();

const { login, register } = require("../controllers/auth");

// ---- Auth

router.post("/login", login);

router.post("/register", register);

// ---- Other

router.get("/home", (req, res) => {
  res.send("Home page");
});

module.exports = router;
