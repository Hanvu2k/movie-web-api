const moviesRouter = require("./Movies");
const userRouter = require("./User");

const route = (app) => {
  app.use("/movies", moviesRouter);
  app.use("/users", userRouter);
};

module.exports = route;
