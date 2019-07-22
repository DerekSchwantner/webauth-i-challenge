const express = require("express");
const mainRouter = require("../routers/mainRouter");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Auth 1 challenge!");
});

server.use("/api", mainRouter);

module.exports = server;
