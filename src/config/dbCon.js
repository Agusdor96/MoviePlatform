require("dotenv").config();
const mongoose  = require("mongoose");

const mongoose = require("mongoose");

const dbCon = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URI, {
         autoIndex: true,  // Esto es válido
      });
      console.log("Conectado a MongoDB");
   } catch (error) {
      console.error("Error al conectar con MongoDB:", error);
      throw error;
   }
};

module.exports = dbCon;



module.exports = dbCon;