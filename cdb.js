const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://abhishekchahar200:jaat2000@abhishekapi.xhhhctn.mongodb.net/taskmanager";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connect to Mongo Successfully");
    })
    .catch(() => {
      console.log("connection failed");
    });
};
module.exports = connectToMongo;
