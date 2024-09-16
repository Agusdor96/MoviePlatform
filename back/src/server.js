const express = require("express");
const indexRouter = require("./routes/routes");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

 app.use(morgan("dev"));
 app.use(cors());
 app.use(express.json()); 
// 2 Encausa la solicitud al enrutador.
app.use(indexRouter);

// Antes de enviar al enrutador la solicitud

module.exports = app;
    