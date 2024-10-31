const { Router } = require("express");
const UserController = require("../controllers/users.controller")
const UserMiddleware = require("../middlewares/user.middleware")
const AuthMiddleware = require("../middlewares/auth.middleware")

const usersRouter = Router()
const userController = new UserController()
const userMid = new UserMiddleware()
const authMidd = new AuthMiddleware()


// usersRouter.get("/", userController.getAllUsers)
usersRouter.get("/:id",
    authMidd.validateUserToken,
    authMidd.validateUserRole(["user"]),
    userController.getUserById)

usersRouter.get("/",
    authMidd.validateUserToken,
    authMidd.validateUserRole(["admin"]),
    userController.getAllUsers)

usersRouter.get("/:userId/moviesLists",
    authMidd.validateUserToken,
    authMidd.validateUserRole(["user"]),
    userMid.validateUserMovieLists,
    userController.getUserMoviesLists)

usersRouter.post("/watchlist",
    authMidd.validateUserToken,
    authMidd.validateUserRole(["user"]),
    userMid.validateUpdateWatchlist,
    userController.updateWatchlist)

usersRouter.post("/watchedMovies",
    authMidd.validateUserToken,
    authMidd.validateUserRole(["user"]),
    userMid.validateWatchedMovies,
    userController.updateWatchedMovies)

// usersRouter.put("/update/:id", userController.updateUserInfo)
// usersRouter.delete("/delete/:id", usersController.deleteOneUser)

module.exports = usersRouter
