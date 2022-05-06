const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const alert = require("alert");
const encrypt = require("mongoose-encryption");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://admin-s1xine:admin@canteen-cravings.g2rak.mongodb.net/userDB"
),
  { useNewUrlParser: true };

const userSchema = new mongoose.Schema({
  fname: String,
  email: String,
  password: String,
});

var secret = "SecretText";
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

const User = new mongoose.model("User", userSchema);

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/home", function (req, res) {
  res.redirect("/");
});

// app.get("/forgotpassword", function (req, res) {
//   res.render("forgotPassword", { pageTitle: "Forgot Password" });
// });

app.get("/sdbce", function (req, res) {
  res.render("sdbce", { pageTitle: "SDBCE Canteen" });
});

app.get("/sdbct", function (req, res) {
  res.render("sdbct", { pageTitle: "SDBCT Canteen" });
});

app.get("/login", function (req, res) {
  res.render("login", { pageTitle: "Login" });
});

app.get("/register", function (req, res) {
  res.render("register", { pageTitle: "Register" });
});
app.get("/logindex", function (req, res) {
  res.render("logindex");
});

app.post("/register", function (req, res) {
  const newUser = new User({
    fname: req.body.fname,
    email: req.body.username,
    password: req.body.password,
  });

  newUser.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.render("logindex");
    }
  });
});

app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ email: username }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("logindex");
        } else {
          alert("Username/Password incorrect.");
        }
      }
    }
  });
});

app.get("/cart", function (req, res) {
  res.render("cart");
});

app.get("/myprofile", function (req, res) {
  res.render("myprofile");
});
app.get("/logindex", function (req, res) {
  res.render("logindex");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("Server has started successfully");
});
