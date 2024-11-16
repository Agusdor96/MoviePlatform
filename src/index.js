const dbCon = require("./config/dbCon");
const app = require ("./server");

dbCon().then(() => {
    const port = process.env.PORT || 3000; // Usar el puerto correcto en producción
    app.listen(port, () => {
       console.log(`Server is running on port ${port}`);
    });
 }).catch((err) => {
    console.error("Error al conectar con la base de datos:", err);
    process.exit(1); // Salir si la conexión falla
 });


