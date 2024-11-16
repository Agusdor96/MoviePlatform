const dbCon = require("./config/dbCon");
const app = require ("./server");

dbCon().then((res) => {
    const port = process.env.PORT || 3000; // Asigna el puerto de Vercel o usa el puerto 3000 localmente
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
  
    })
})

