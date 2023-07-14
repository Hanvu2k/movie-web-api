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

    res.status(200).json({
      success: true,
      message: "Tải movie trending thành công!",
      results:
        trendingMoviesByPage.length > 0
          ? trendingMoviesByPage
          : "Không còn movies nào cả !!!",
      page: page || 1,
      total_pages: Math.floor(trendingMovies.length / 20),
    });
  }

  /*---------------------------------------------------------------- */
  // get movie top rate
  getMoviesTopRate(req, res) {
    const page = req.query.page;
    const topRateMovies = movieList.filter((movie) => {
      return movie.vote_average > 9;
    });

    // get movie by page
    const topRateMoviesByPage = getItemsByPage(topRateMovies, page || 1);

    res.status(200).json({
      success: true,
      message: "Tải movie high rating thành công!",
      results:
        topRateMoviesByPage.length > 0
          ? topRateMoviesByPage
          : "Không còn movies nào cả !!!",
      page: page || 1,
      total_pages: Math.floor(topRateMovies.length / 20),
    });
  }

  /*---------------------------------------------------------------- */
  // get movie
  getMoviesByGenre(req, res) {
    const page = req.query.page;
    const genreId = req.params.genre_id;
    const genreMovie = {};

    // has no param
    if (!genreId)
      return res.status(400).json({
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
      return res.status(400).json({
        success: true,
        message: "Not found that gerne id",
      });
    }

    const moviesByGenre = movieList.filter((movie) => {
      return movie.genre_ids[0] === genreMovie.id;
    });

    // get movi by page
    const moviesByGenreByPage = getItemsByPage(moviesByGenre, page || 1);

    res.status(200).json({
      success: true,
      message: "Tải movies thành công!",
      results: moviesByGenreByPage,
      page: page || 1,
      total_pages: Math.floor(moviesByGenre.length / 20),
      genre_name: genreMovie.name,
    });
  }

  /*---------------------------------------------------------------- */
  // get trailer
  getVideoMovie(req, res) {
    const movieId = req.params.film_id;
    const movideVideos = {};

    // has no param
    if (!movieId)
      return res.status(400).json({
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

    if (trailer?.length === 0 || !trailer)
      return res.status(404).json({
        success: true,
        message: "Not found video",
      });

    res.status(200).json({
      success: true,
      message: "Tải video thành công!",
      results: trailer[0],
    });
  }

  /*---------------------------------------------------------------- */
  // search movie
  searchMovies(req, res) {
    const keyword = req.params.keyword;

    const moviesBySearch = movieList.filter((movie) =>
      movie.name.toLowerCase().includes(keyword.toLowerCase())
    );

    // invalid keyword
    if (moviesBySearch.length === 0) {
      res.status(400).json({
        success: false,
        message: "Not found keyword param",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tải movies thành công!",
      results: moviesBySearch,
    });
  }

  /*---------------------------------------------------------------- */
  // searchByOption
  searchMoviesByOption(req, res) {
    const year = req.query.year;
    const genre = req.query.genre;
    const media_type = req.query.media_type;
    const language = req.query.language;

    const genreMovie = genreList.find((movie) => {
      return movie.name === genre;
    });

    // year movies
    if (year) {
      const moviesSoft = movieList.filter((movie) => {
        return movie.release_date.split("-")[0] === year;
      });

      if (moviesSoft.length === 0) {
        res.status(200).json({
          success: false,
          message: `Store have no movies for the year ${year}`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Tải movie thành công",
        results: moviesSoft,
      });
      return;
    }

    // genre movies
    if (genre) {
      const moviesSoft = movieList.filter((movie) => {
        return movie.genre_ids[0] === genreMovie.id;
      });

      if (moviesSoft.length === 0) {
        res.status(400).json({
          success: false,
          message: `Store have no movies for ${genre} genre`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Tải movie thành công",
        results: moviesSoft,
      });
      return;
    }

    // media_type movies
    if (media_type) {
      if (media_type === "all") {
        const moviesSoft = [...movieList];
        res.status(200).json({
          success: true,
          message: "Tải movie thành công",
          results: moviesSoft,
        });
        return;
      } else {
        const moviesSoft = movieList.filter((movie) => {
          return movie.media_type === media_type;
        });

        if (moviesSoft.length === 0) {
          res.status(200).json({
            success: false,
            message: `Store have no movies for ${media_type} media type`,
          });
        }

        res.status(200).json({
          success: true,
          message: "Tải movie thành công",
          results: moviesSoft,
        });
      }
      return;
    }

    // language movies
    if (language) {
      const moviesSoft = movieList.filter((movie) => {
        return movie.original_language === language;
      });

      if (moviesSoft.length === 0) {
        res.status(400).json({
          success: false,
          message: `Store have no movies for ${language} language`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Tải movie thành công",
        results: moviesSoft,
      });
      return;
    }
  }
}

module.exports = new MovieController();
