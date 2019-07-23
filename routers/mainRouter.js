const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("./mainHelpers");
const authenticate = require("../middleware/auth-middleware");
const validateUserInfo = require("../middleware/validateUserInfo");

const router = express.Router();

router.post("/register", validateUserInfo, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved.username);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/users", authenticate, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ err: "something went wrong" }));
});

router.post("/login", validateUserInfo, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username;
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: "you need to try again" });
      } else {
        res.status(200).json({ message: "bye bye" });
      }
    });
  } else {
    res.status(200).json({ message: "ok bye" });
  }
});

module.exports = router;
