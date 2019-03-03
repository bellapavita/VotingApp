const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const pollsRoutes = require("./routes/polls");
const clientsRoutes = require("./routes/clients");

const app = express();

mongoose
  .connect(
    "mongodb+srv://bella:bella@cluster0-th3y8.mongodb.net/test?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/polls", pollsRoutes);
app.use("/api/clients", clientsRoutes);

module.exports = app;
