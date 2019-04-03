const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const pollsRoutes = require("./routes/polls");
const infoRoutes = require("./routes/info");

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
app.use(bodyParser.urlencoded({ extended: true }));

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

//start

initiateMultichain = function() {
  // Change password, located in /root/.multichain/medium-demo-multichain/multichain.conf
  console.log("tests");
  let multichain = require("multichain-node")({
    port: 6270,
    host: '68.183.19.8',
    user: "multichainrpc",
    pass: "FF2jPhLCVZiDjr6LZewJp4eA7JJVqcnrsK6PgHvCADG7" //chain1
  });
  return multichain;
}

//app.listen(3500, () => console.log('Server is up and running'))

//app.use("/api/polls", pollsRoutes);
// app.use("/api/info", infoRoutes);
require('./routes/info.js')(app)
require('./routes/polls.js')(app)

module.exports = app;
