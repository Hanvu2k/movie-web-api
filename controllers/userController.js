const userModal = require("../models/User");

class UserController {
  // get movie list
  getToken(req, res) {
    res.send(userModal.all());
  }
}

module.exports = new UserController();
