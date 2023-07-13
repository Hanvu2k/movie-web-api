const express = require("express");
const app = express();
const port = 5000;
const route = require("./routes");

route(app);

app.listen(port);
