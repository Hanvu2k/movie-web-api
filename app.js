const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const route = require("./routes");
const corsOptions = {
  origin: "*",
};

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use(cors(corsOptions));

route(app);

app.listen(port);
