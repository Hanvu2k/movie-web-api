const moviesRouter = require("./Movies");
const userRouter = require("./User");

const route = (app) => {
  app.use("/api/v1/movies", moviesRouter);
  app.use("/api/v1/users", userRouter);
  app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
  });
};

module.exports = route;
