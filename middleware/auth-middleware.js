const bcrypt = require("bcryptjs");

const Users = require("../routers/mainHelpers");

module.exports = authenticate;

function authenticate(req, res, next) {
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
  //   const { username, password } = req.headers;
  //   Users.findBy({ username })
  //     .first()
  //     .then(user => {
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         next();
  //       } else {
  //         res.status(401).json({ message: "Invalid Credentials" });
  //       }
  //     })
  //     .catch(error => {
  //       res.status(500).json(error);
  //     });
}
