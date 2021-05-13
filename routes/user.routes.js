module.exports = app => {
    const users = require("../controllers/user.controller.js");
    
    app.get("/users/:username/:password", users.findOne);
    app.get("/userTables/:userID", users.findOrders);
    app.get("/userTables/done/:userID", users.findDoneOrders);
    app.get("/inventory/:userID", users.retrieveInventory);
    app.get("/trucktraffic", users.retrieveTraffic);
    app.get("/operationtables/:userID", users.retrieveOperations);
    app.get("/operationtables2/:userID", users.retrieveOperations2);

};