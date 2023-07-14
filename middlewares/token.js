const userModal = require("../models/User");
const userList = userModal.all();

module.exports.verifyToken = (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = userList.find((user) => user.token === token);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = user;
  next();
};
