const Poll = require("../models/poll");
module.exports = (app) => {

  app.post("/api/poll/addPoll", (req, res) => {
    let multichain = require("multichain-node")({
      port: 6270,
      host: '68.183.19.8',
      user: "multichainrpc",
      pass: "FF2jPhLCVZiDjr6LZewJp4eA7JJVqcnrsK6PgHvCADG7" //chain1
    });

    
    // let newAddress = multichain.getNewAddress((err, res) => {
    //   if(err){
    //       throw err;
    //   }
    //   //console.log(res);
    //   newAddress = res;
    //   console.log("Finish with getting newAddress");
    // });
    multichain.getNewAddress().then( newAddress => {
      
    
      //multichain.issue({address: newAddress, asset: "zcoin", qty: 50000, units: 0.01, details: {hello: "world"}},
      //  (err, res) => {
      //    console.log(res)
      //})
      console.log(newAddress);
      console.log(typeof(newAddress));
      const poll = new Poll({
        title: req.body.title,
        address: newAddress,
        option1: req.body.option1,
        option2: req.body.option2,
        value1: req.body.value1,
        value2: req.body.value2
      });
      console.log("About to add to MongoDB and res");
      poll.save().then(createdPoll => {
        res.status(201).json({
          message: "Poll added successfully",
          pollId: createdPoll._id
        });
      });
    });
  });

  app.post('/api/poll/votePoll/', (req, res, next) => {
    console.log("Inside backend /votePoll and id " 
      + req.body.poll._id + " picked option " + req.body.optionPick );
    console.log(req.body);
    var firstValue = 0;
    var secondValue = 0;
    const optionPick = req.body.optionPick

    if (optionPick == 1) {
      firstValue = 1;
    }
    if (optionPick == 2) {
      secondValue = 1;
    }
    
    Poll.findOneAndUpdate(req.body.poll._id, {
      title: req.body.poll.title,
      option1: req.body.poll.option1,
      option2: req.body.poll.option2,
      value1: req.body.poll.value1 + firstValue,
      value2: req.body.poll.value2 + secondValue
    }, {new: true}).then(data => {
      res.status(200).send({ 
        message: "Vote successful!",
        result: data
       });
    });
  });

  app.put("/api/poll/updateOne/:id", (req, res, next) => {
    const poll = new Poll({
      _id: req.body.id,
      title: req.body.title,
      option1: req.body.option1,
      option2: req.body.option2
    });
    Poll.updateOne({ _id: req.params.id }, poll).then(result => {
      res.status(200).send({ message: "Update successful!" });
    });
  });

  app.get("/api/poll/find", (req, res, next) => {
    Poll.find().then(documents => {
      res.status(200).json({
        message: "Polls fetched successfully!",
        polls: documents
      });
    });
  });

  app.get("/api/poll/findById/:id", (req, res, next) => {
    Poll.findById(req.params.id).then(poll => {
      if (poll) {
        res.status(200).json(poll);
      } else {
        res.status(404).json({ message: "Poll not found!" });
      }
    });
  });

  app.delete("/api/poll/delete/:id", (req, res, next) => {
    Poll.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Poll deleted!" });
    });
  });
};
