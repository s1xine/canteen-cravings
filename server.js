const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const knex = require("knex");
const ejs = require("ejs");
const _ = require("lodash");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "postgres",
    database: "loginsystem",
  },
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// let intialPath = path.join(__dirfname, "views");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/resetpassword", (req, res) => {
  res.render("resetPassword");
});

app.post("/register-user", (req, res) => {
  const { fname, email, password } = req.body;

  if (!fname.length || !email.length || !password.length) {
    res.json("Please fill all the fields.");
  } else {
    db("users")
      .insert({
        fname: fname,
        email: email,
        password: password,
      })
      .returning(["fname", "email"])
      .then((data) => {
        res.json(data[0]);
      })
      .catch((err) => {
        if (err.detail.includes("already exists")) {
          res.json("email already exists");
        }
      });
  }
});

app.post("/login-user", (req, res) => {
  const { email, password } = req.body;

  db.select("fname", "email")
    .from("users")
    .where({
      email: email,
      password: password,
    })
    .then((data) => {
      if (data.length) {
        res.json(data[0]);
      } else {
        res.json("email or password is incorrect");
      }
    });
});

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("listening on port 3000......");
});
