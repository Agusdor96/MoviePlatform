const {Router} = require ("express");
const moviesRouter = require("./moviesRouter");
const scrappingRouter = require("./scrappingRoutes");
const usersRouter = require("./usersRouter");
const authRouter = require("./authRouter");
const AuthMiddleware = require("../middlewares/auth.middleware")

const indexRouter = Router();
const authMidd = new AuthMiddleware()

indexRouter.use("/movies", moviesRouter)
indexRouter.use("/scrapping", authMidd.validateUserToken, authMidd.validateUserRole(["admin"]), scrappingRouter)
indexRouter.use("/users", usersRouter)
indexRouter.use("/auth", authRouter)

module.exports = indexRouter;


