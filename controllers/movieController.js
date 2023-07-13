const movieModal = require("../models/Movies");
const genresModal = require("../models/Genres");
const videoModal = require("../models/Videos");
const getItemsByPage = require("../utils/paging");

const movieList = movieModal.all();
const genreList = genresModal.all();
const videoList = videoModal.all();

class MovieController {
  // get movie trending
  getMoviesTrending(req, res) {
    let page = req.query.page;
    const trendingMovies = movieList.filter((movie) => {
      return movie.popularity >= 800;
    });

    // get movie by page
    const trendingMoviesByPage = getItemsByPage(trendingMovies, page || 1);

    res.json({
      status: 200,
      success: true,
      message: "Tải movie trending thành công!",
      results:
        trendingMoviesByPage.length > 0
          ? trendingMoviesByPage
          : "Không còn movies nào cả !!!",
      page: page || 1,
      total_pages: trendingMovies.length,
    });
  }

  // get movie top rate
  getMoviesTopRate(req, res) {
    const page = req.query.page;
    const topRateMovies = movieList.filter((movie) => {
      return movie.vote_average > 9;
    });

    // get movie by page
    const topRateMoviesByPage = getItemsByPage(topRateMovies, page || 1);

    res.json({
      status: 200,
      success: true,
      message: "Tải movie high rating thành công!",
      results:
        topRateMoviesByPage.length > 0
          ? topRateMoviesByPage
          : "Không còn movies nào cả !!!",
      page: page || 1,
      total_pages: topRateMovies.length,
    });
  }

  // get movie
  getMoviesByGenre(req, res) {
    const page = req.query.page;
    const genreId = req.params.genre_id;
    const genreMovie = {};

    // has no param
    if (!genreId)
      return res.json({
        status: 400,
        success: false,
        message: "Not found gerne param",
      });

    genreList.map((genre) => {
      if (genre.id === +genreId) {
        genreMovie.id = genre.id;
        genreMovie.name = genre.name;
      }
      return;
    });

    // Invalid genre
    if (!genreMovie.id && !genreMovie.name) {
      return res.json({
        status: 400,
        success: false,
        message: "Not found that gerne id",
      });
    }

    const moviesByGenre = movieList.filter((movie) => {
      return movie.genre_ids[0] === genreMovie.id;
    });

    // get movi by page
    const moviesByGenreByPage = getItemsByPage(moviesByGenre, page || 1);

    res.json({
      status: 200,
      success: true,
      message: "Tải movies thành công!",
      results: moviesByGenreByPage,
      page: page || 1,
      total_pages: moviesByGenre.length,
      genre_name: genreMovie.name,
    });
  }

  // get trailer
  getVideoMovie(req, res) {
    const movieId = req.params.film_id;
    const movideVideos = {};

    // has no param
    if (!movieId)
      return res.json({
        status: 400,
        success: false,
        message: "Not found film_id param",
      });

    videoList.map((movie) => {
      if (movie.id === +movieId) {
        movideVideos.videos = movie.videos;
      }
    });

    const trailer = movideVideos?.videos?.filter((video) => {
      return (
        video.official === true &&
        video.site === "YouTube" &&
        (video.type === "Trailer" || video.type === "Teaser")
      );
    });

    if (trailer.length === 0)
      return res.json({
        status: 404,
        success: true,
        message: "Not found video",
      });

    res.json({
      status: 200,
      success: true,
      message: "Tải video thành công!",
      results: trailer[0],
    });
  }

  // search movie
  searchMovies(req, res) {
    const keyword = req.params.keyword;

    const moviesBySearch = movieList.map((movie) => {
      // return movie.name.include(keyword.toLowerCase.split(""));
    });

    res.json({
      status: 200,
      success: true,
      message: "Tải movies thành công!",
      // results: moviesByGenreByPage,
      // page: page || 1,
      // total_pages: moviesByGenre.length,
      // genre_name: genreMovie.name,
    });
  }
}

module.exports = new MovieController();
