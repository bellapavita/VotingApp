module.exports = (app) => {

  app.get("/api/info/initiateMultichain", (req, res, next) => {
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
  });

  app.get("/api/info", function (request, response) {
    response.json({message: 'works'});
  });

  app.get("/api/info/publish", function (request, response) {
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

  app.get("/api/info/getInfo", (req, res) => {
    var multichain = initiateMultichain();
    multichain.getInfo((err, info) => {
      if(err){
          throw err;
      }
      res.send(info);
    })
  });
};

