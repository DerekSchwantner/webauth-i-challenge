const express = require("express");
const mainRouter = require("../routers/mainRouter");
const server = express();
const cors = require("cors");

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("Auth 1 challenge!");
});

server.use("/api", mainRouter);

module.exports = server;
