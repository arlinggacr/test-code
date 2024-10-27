// src/index.js
require("dotenv").config();
const express = require("express");
const connectDB = require("../src/config/database");
const userRoutes = require("../src/routes/user.routes");

const app = express();

app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the User API!");
});

module.exports = app;
