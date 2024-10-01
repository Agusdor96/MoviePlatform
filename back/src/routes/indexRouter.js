const {Router} = require ("express");
const moviesRouter = require("./moviesRouter");
const scrappingRouter = require("./scrappingRoutes");
const usersRouter = require("./usersRouter");
const authRouter = require("./authRouter");

const indexRouter = Router();

indexRouter.use("/movies", moviesRouter)
indexRouter.use("/scrapping", scrappingRouter)
indexRouter.use("/users", usersRouter)
indexRouter.use("/auth", authRouter)

module.exports = indexRouter;


