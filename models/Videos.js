const fs = require("fs");
const path = require("path");

const videoListPath = path.join(__dirname, "../data/videoList.json");

const Videos = {
  all: function () {
    return JSON.parse(fs.readFileSync(videoListPath, "utf8"));
  },
};

module.exports = Videos;
