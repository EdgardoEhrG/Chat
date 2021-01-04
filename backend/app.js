const express = require("express");
const bodyParser = require("body-parser");

const config = require("./config");
const router = require("./router");

const app = express();

app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = config.appPort;

app.listen(port, () => {
  console.log(`Server is runnin' on port ${port}`);
});
