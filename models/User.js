const fs = require("fs");
const path = require("path");

const userPath = path.join(__dirname, "../data/userToken.json");

const Users = {
  all: function () {
    return JSON.parse(fs.readFileSync(userPath, "utf8"));
  },
};

module.exports = Users;
