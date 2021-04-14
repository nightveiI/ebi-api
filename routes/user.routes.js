module.exports = app => {
    const users = require("../controllers/user.controller.js");
    
    app.get("/users/:username/:password", users.findOne);
    app.get("/userTables/:userID", users.findOrders);
    app.get("/userTables/done/:userID", users.findDoneOrders);
    app.get("/truckTraffic", users.getTraffic);
};