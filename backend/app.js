const express = require("express");

const config = require("./config");

const app = express();

const port = config.appPort;

app.get("/home", (req, res) => {
  res.send("Home page");
});

app.listen(port, () => {
  console.log(`Server is runnin' on port ${port}`);
});
