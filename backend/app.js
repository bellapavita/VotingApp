const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const pollsRoutes = require("./routes/polls");

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

initiateMultichain = function() {
  // Change password, located in /root/.multichain/medium-demo-multichain/multichain.conf
  var multichain = require("multichain-node")({
    port: 6759,
    host: '68.183.19.8',
    user: "multichainrpc",
    pass: "35SWEGR9B8pGzndsqv3nf1tqZxMXxoD4sKVnZoNSQu6D"
  });
  return multichain;
}

app.get("/", function (request, response) {
  response.json({message: 'works'});
});

app.post("/publish", function (request, response) {
  var multichain = initiateMultichain();
  var title = request.body.title;
  var body = request.body.body;

multichain.publish({
  stream: 'root',
  key: 'Medium demo',
  data:{
    "json":
    {
    'title' : title,
    'body' : body
    }
  }
  }, (err, info) => {
  console.log('Response: '+info);
  response.json({transactionId: info});
  })
});

app.listen(3500, () => console.log('Server is up and running'))

app.use("/api/polls", pollsRoutes);

module.exports = app;
