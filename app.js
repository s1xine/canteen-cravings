const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/login", function (req, res) {
  res.render("login", { pageTitle: "Login" });
});

app.get("/register", function (req, res) {
  res.render("register", { pageTitle: "Register" });
});

app.get("/forgotpassword", function (req, res) {
  res.render("forgotPassword", { pageTitle: "Forgot Password" });
});

app.get("/sdbce", function (req, res) {
  res.render("sdbce", { pageTitle: "SDBCE Canteen" });
});

app.get("/sdbct", function (req, res) {
  res.render("sdbct", { pageTitle: "SDBCT Canteen" });
});

app.get("/home", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
