const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config();
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {

  res.json({ message: "Hello World." });
});

require("./routes/user.routes.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// const {
//   Sequelize,
//   DataTypes
// } = require('sequelize');

// const sequelize = new Sequelize('ebdata', 'root', 'r00tbeer', {
//   host: '64.88.207.34',
//   dialect: 'mysql',
// });

// var CryptoJS = require("crypto-js");
// const cryptoJs = require('crypto-js');



// //verify we received connection
// try {
//   sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }
// const User = sequelize.define('User', {
//   //Model attributes are defined here
//   UName: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },

//   password: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
// }, {
//   timestamps: false,
//   tableName: 'tblusuarios_reg'
// });

// loginValidation("MFOOD", "1");

// function loginValidation(username, pass) {

//   var userFound = false;
//   sequelize.models.User.findAll({
//     where: {
//       UName: username
//     }
//   }).then(users => {
//     users.forEach((u) => {
//       if (u["password"] == cryptoJs.MD5(pass)) {
//         userFound = true;
//       }
//     });
//   });
//   return userFound;
// }