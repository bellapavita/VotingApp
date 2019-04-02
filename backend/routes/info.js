const express = require("express");

const router = express.Router();

router.get("", (req, res, next) => {
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

module.exports = router;
