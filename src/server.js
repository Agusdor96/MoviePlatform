const express = require("express");
const indexRouter = require("./routes/indexRouter");
const morgan = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require('cookie-parser');

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json()); 
app.use(cookieParser());
app.use(indexRouter);

app.use(errorHandler)
module.exports = app;
    