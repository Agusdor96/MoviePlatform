const dbCon = require("./src/config/dbCon");
const app = require ("./src/server");

dbCon().then((res) => {
 app.listen(Number(process.env.PORT), ()=> {
    console.log("Escuchando en puerto 3000")
    })
})

