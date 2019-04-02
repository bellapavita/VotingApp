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

//start

initiateMultichain = function() {
  // Change password, located in /root/.multichain/medium-demo-multichain/multichain.conf
  let multichain = require("multichain-node")({
    port: 6270,
    host: '68.183.19.8',
    user: "multichainrpc",
    pass: "FF2jPhLCVZiDjr6LZewJp4eA7JJVqcnrsK6PgHvCADG7" //chain1
  });
  return multichain;
}

app.get("/", function (request, response) {
  response.json({message: 'works'});
});

app.get("/publish", function (request, response) {
  var multichain = initiateMultichain();

  multichain.getInfo((err, info) => {
    if(err){
        throw err;
    }
    console.log(info);
  })

  multichain.publish({
    stream: 'root',
    key: 'bella2',
    data: 'a1b2c3d4'
  }, (err, info) => {
      console.log('Response: ' + info);
      if(err){
        throw err;
      }
      response.json({transactionId: info});
    }
  )
});

app.listen(3500, () => console.log('Server is up and running'))

app.use("/api/polls", pollsRoutes);
app.use("/api/info", infoRoutes);

module.exports = app;
