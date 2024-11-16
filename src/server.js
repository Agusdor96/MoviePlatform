const express = require("express");
require('express-async-errors')
const indexRouter = require("./routes/indexRouter");
const morgan = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require('cookie-parser');

const app = express();
app.use(morgan("dev"));
app.use(cors({ origin: 'https://movie-platform-front.vercel.app' }));
app.use(express.json()); 
app.use(cookieParser());
app.use(indexRouter);

app.use(errorHandler)
module.exports = app;
    