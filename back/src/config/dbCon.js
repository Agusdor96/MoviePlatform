require("dotenv").config();

const mongoose  = require("mongoose");

const dbCon = async () => {
   await mongoose.connect(process.env.MONGO_URI);
  
};

module.exports = dbCon;