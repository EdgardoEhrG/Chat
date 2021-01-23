const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");

const socketServer = require("./socket");

const config = require("./config");
const router = require("./router");

const app = express();

app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors);
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));

const port = config.appPort;

const server = http.createServer(app);
socketServer(server);

server.listen(port, () => {
  console.log(`Server is runnin' on port ${port}`);
});
