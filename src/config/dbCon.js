require("dotenv").config();
const mongoose  = require("mongoose");

const dbCon = async () => {
   if (mongoose.connection.readyState >= 1) {
      // Si ya está conectado, no hacer nada
      return;
   }
   try {
      console.log("Intentando conectar a MongoDB...");

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