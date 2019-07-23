module.exports = validateUserInfo;

function validateUserInfo(req, res, next) {
  const userInfo = req.body;
  console.log("time to validate the action info");
  if (!userInfo.username || !userInfo.password) {
    res.status(400).json({ message: "missing username or  password" });
  } else {
    next();
  }
}
