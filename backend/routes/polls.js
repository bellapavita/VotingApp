const express = require("express");

const Poll = require("../models/poll");

const router = express.Router();

router.post("", (req, res, next) => {
  const poll = new Poll({
    title: req.body.title,
    option1: req.body.option1,
    option2: req.body.option2,
    value1: req.body.value1,
    value2: req.body.value2
    //address1:
    //address2:
  });

  poll.save().then(createdPoll => {
    res.status(201).json({
      message: "Poll added successfully",
      pollId: createdPoll._id
    });
  });

  let multichain = require("multichain-node")({
    port: 6270,
    host: '68.183.19.8',
    user: "multichainrpc",
    pass: "FF2jPhLCVZiDjr6LZewJp4eA7JJVqcnrsK6PgHvCADG7" //chain1
  });

  multichain.getnewaddress(
    (err, res) => {
      console.log(res)
  })

  multichain.issue({address: someAddress, asset: "zcoin", qty: 50000, units: 0.01, details: {hello: "world"}},
    (err, res) => {
      console.log(res)
  })
});

router.patch('/vote/:id/:optionPick', (req, res, next) => {
  const firstValue = 0;
  const secondValue = 0;

  if (optionPick == 1) {
    firstValue = 1;
  }
  if (optionPick == 2) {
    secondValue = 1;
  }

  const poll = new Poll({
    _id: req.body.id,
    title: req.body.title,
    option1: req.body.option1,
    option2: req.body.option2,
    value1: req.body.value1 + firstValue,
    value2: req.body.value2 + secondValue
  });

  Poll.updateOne({ _id: req.params.id }, poll).then(res => {
    res.status(200).json({ message: "Vote successful!" });
  });
});

router.put("/:id", (req, res, next) => {
  const poll = new Poll({
    _id: req.body.id,
    title: req.body.title,
    option1: req.body.option1,
    option2: req.body.option2
  });
  Poll.updateOne({ _id: req.params.id }, poll).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  Poll.find().then(documents => {
    res.status(200).json({
      message: "Polls fetched successfully!",
      polls: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Poll.findById(req.params.id).then(poll => {
    if (poll) {
      res.status(200).json(poll);
    } else {
      res.status(404).json({ message: "Poll not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Poll.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Poll deleted!" });
  });
});

module.exports = router;
