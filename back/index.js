const dbCon = require("./src/config/dbCon");
const app = require ("./src/server");

dbCon().then((res) => {
 app.listen(3000, ()=> {
    console.log("Escuchando en puerto 3000")
    })
})

