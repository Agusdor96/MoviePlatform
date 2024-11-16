const dbCon = require("./config/dbCon");
const app = require ("./server");

module.exports = async (req, res) => {
    try {
      await dbCon();  // Conectar a la base de datos
      app(req, res);  // Llamar a Express para manejar la solicitud
    } catch (err) {
      console.error("Error al conectar con la base de datos:", err);
      res.status(500).send("Error en el servidor");
    }
  };
  


