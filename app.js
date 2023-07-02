require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const path = require("path");
var cookieParser = require("cookie-parser");
const checkAuthCookie = require("./middleware/authentication");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
require("./connection/db");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(checkAuthCookie("token"));
app.use("/api/v1", routes);
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, (req, res) => {
  console.log(`Server started at port ${PORT}`);
});
