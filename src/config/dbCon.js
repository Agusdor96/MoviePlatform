require("dotenv").config();
const mongoose  = require("mongoose");

const dbCon = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URI, {
         autoIndex: true,
      });
      console.log("Conexión exitosa a MongoDB");
   } catch (error) {
      console.error("Error al conectar con MongoDB:", error);
      throw new Error("Failed to connect to MongoDB");
   }
};


module.exports = dbCon;