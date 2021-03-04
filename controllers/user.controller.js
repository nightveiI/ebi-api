const user = require("../models/user.model.js");

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  user.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
  user.findbyUser(req.params.username, req.params.password, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with username ${req.params.username}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with username " + req.params.username
        });
      }
    } else res.send(data);
  });
};

exports.findOrders = (req,res) => {
  user.getTables(req.params.userID, (err, data) => {
    if(err){
      if(err.kind == "not_found") {
        res.status(404).send ({
          message: `Not found tables with userID ${req.params.userID}.`
        });
      } else {
        res.status(900).send({
          message: "Error retrieving tables with user ID " + req.params.userID
        });
      }
    } else res.send(data);
  });
};

exports.findDoneOrders = (req,res) => {
  user.getdoneTables(req.params.userID, (err, data) => {
    if(err){
      if(err.kind == "not_found") {
        res.status(404).send ({
          message: `Not found tables with userID ${req.params.userID}.`
        });
      } else {
        res.status(900).send({
          message: "Error retrieving tables with user ID " + req.params.userID
        });
      }
    } else res.send(data);
  });
};

exports.retrieveInventory = (req,res) => {
  user.getInventory(req.params.userID, (err, data) => {
    if(err){
      if(err.kind == "not_found") {
        res.status(404).send ({
          message: `Not found inventory with userID ${req.params.userID}.`
        });
      } else {
        res.status(900).send({
          message: "Error retrieving inventory with user ID " + req.params.userID
        });
      }
    } else res.send(data);
  });
};