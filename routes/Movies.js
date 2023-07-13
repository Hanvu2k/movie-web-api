const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");

router.get("/trending", movieController.getMoviesTrending);

router.get("/top-rate", movieController.getMoviesTopRate);

router.get("/discover/:genre_id", movieController.getMoviesByGenre);
router.get("/discover/", movieController.getMoviesByGenre);

router.get("/video/:film_id", movieController.getVideoMovie);
router.get("/video", movieController.getVideoMovie);

router.get("/search/:keyword", movieController.searchMovies);

module.exports = router;
