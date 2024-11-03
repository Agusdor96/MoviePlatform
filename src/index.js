const dbCon = require("./config/dbCon");
const app = require ("./server");

dbCon().then((res) => {
 app.listen(Number(process.env.PORT), ()=> {
    console.log("Escuchando....")
    })
})

