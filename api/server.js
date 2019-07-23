const express = require("express");
const mainRouter = require("../routers/mainRouter");
const server = express();
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const sessionConfig = {
  name: "newcookie",
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false, //true in production
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: require("../data/db-config"),
    createtable: true,
    sidfieldname: "sid",
    clearInterval: 1000 * 60 * 60 //deletes expired sessions every hour
  })
};

server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.get("/", (req, res) => {
  res.send("Auth 1 challenge!");
});

server.use("/api", mainRouter);

module.exports = server;
