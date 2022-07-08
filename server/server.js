const express = require("express");

const app = express();

const { User } = require("../persist/model");

const setUpAuth = require("./auth");
const setUpSession = require("./session");

app.use(express.json());

setUpSession(app);
setUpAuth(app);

app.post("/users", async (req, res) => {
  try {
    let user = await User.create({
      username: req.body.username,
      fullname: req.body.fullname,
      password: req.body.password,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      message: "post request failed to create user",
      error: err,
    });
  }
});

app.get("/users", async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    res.status(500).json({
      message: "could not get users",
      error: err,
    });
    return;
  }
  res.status(200).json(users);
});

module.exports = app;
