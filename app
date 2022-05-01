const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("login");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/home", function (req, res) {
  res.render("index");
});

// app.get("/posts/:postName", function (req, res) {
//   const requestedTitle = _.lowerCase([req.params.postName]);

//   posts.forEach(function (post) {
//     const storedTitle = _.lowerCase([post.title]);

//     if (storedTitle === requestedTitle) {
//       res.render("post", {
//         title: post.title,
//         content: post.content,
//       });
//     }
//   });
// });

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
