const fs = require("fs");
const path = require("path");

const movieListPath = path.join(__dirname, "../data/movieList.json");

const Movies = {
  all: function () {
    return JSON.parse(fs.readFileSync(movieListPath, "utf8"));
  },
};

module.exports = Movies;
