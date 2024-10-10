require("dotenv").config();

const mongoose  = require("mongoose");

const dbCon = async () => {
   await mongoose.connect(process.env.MONGO_URI,{
      autoIndex:true
   });
   console.log("Connected to MongoDB")
};

module.exports = dbCon;