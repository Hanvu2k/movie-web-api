const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/token");

const movieController = require("../controllers/movieController");

router.get("/trending", verifyToken, movieController.getMoviesTrending);

router.get("/top-rate", verifyToken, movieController.getMoviesTopRate);

router.get(
  "/discover/:genre_id",
  verifyToken,
  movieController.getMoviesByGenre
);

router.get("/discover/", verifyToken, movieController.getMoviesByGenre);

router.get("/video/:film_id", verifyToken, movieController.getVideoMovie);
router.get("/video", verifyToken, movieController.getVideoMovie);

router.get("/search/:keyword", verifyToken, movieController.searchMovies);
router.get("/search", verifyToken, movieController.searchMoviesByOption);

module.exports = router;
