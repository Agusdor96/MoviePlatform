const dbCon = require("./config/dbCon");
const app = require ("./server");

dbCon().then((res) => {
 app.listen(process.env.PORT || 3000, () => {
    console.log("Escuchando....")
    })
})

