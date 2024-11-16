const dbCon = require("./config/dbCon");
const app = require ("./server");

dbCon()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Termina el proceso si hay un error de base de datos
  });


