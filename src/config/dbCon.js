require("dotenv").config();
const mongoose  = require("mongoose");


let isConnected = false; // Variable para mantener la conexión persistente

const dbCon = async () => {
  if (isConnected) {
    console.log("Usando conexión existente a MongoDB");
    return; // Si ya estamos conectados, no reconectamos
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });
    isConnected = true;
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

module.exports = dbCon;