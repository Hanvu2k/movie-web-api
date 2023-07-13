const fs = require("fs");
const path = require("path");

const GenreListPath = path.join(__dirname, "../data/genreList.json");

const Genres = {
  all: function () {
    return JSON.parse(fs.readFileSync(GenreListPath, "utf8"));
  },
};

module.exports = Genres;
