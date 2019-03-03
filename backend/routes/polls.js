const express = require("express");

const Poll = require("../models/poll");

const router = express.Router();

router.post("", (req, res, next) => {
  const poll = new Poll({
    title: req.body.title,
    option1: req.body.option1,
    option2: req.body.option2
  });
  poll.save().then(createdPoll => {
    res.status(201).json({
      message: "Poll added successfully",
      pollId: createdPoll._id
    });
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
