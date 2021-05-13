const user = require("../models/user.model.js");




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

exports.findOrders = (req, res) => {
  user.getTables(req.params.userID, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
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

exports.findDoneOrders = (req, res) => {
  user.getdoneTables(req.params.userID, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
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

exports.retrieveInventory = (req, res) => {
  user.getInventory(req.params.userID, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
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

exports.retrieveTraffic = (req, res) => {
  user.getTraffic((err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: `Not found traffic.`
        });
      } else {
        res.status(900).send({
          message: "Error retrieving traffic"
        });
      }
    } else res.send(data);
  });
};


exports.retrieveTraffic = (req, res) => {
  user.getTraffic((err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: `Not found traffic.`
        });
      } else {
        res.status(900).send({
          message: "Error retrieving traffic"
        });
      }
    } else res.send(data);
  });
};

exports.retrieveOperations = (req, res) => {
  user.getOperations(req.params.userID, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: `Not found.`
        });
      } else {
        res.status(900).send({
          message: "Error retrieving operations"
        });
      }
    } else res.send(data);
  });
};


exports.retrieveOperations2 = (req, res) => {
  user.get2ndOperations(req.params.userID, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: `Not found.`
        });
      } else {
        res.status(900).send({
          message: "Error retrieving operations"
        });
      }
    } else res.send(data);
  });
};