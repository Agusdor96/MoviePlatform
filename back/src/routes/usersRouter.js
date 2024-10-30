const { Router } = require("express");
const UserController = require("../controllers/users.controller")
const UserMiddleware = require("../middlewares/user.middleware")

const usersRouter = Router()
const userController = new UserController()
const userMid = new UserMiddleware()


// usersRouter.get("/", userController.getAllUsers)
usersRouter.get("/:id", userController.getUserById)

usersRouter.post("/watchlist",
    userMid.validateUserAndMovieData,
    userController.addToWatchlist)
// usersRouter.put("/update/:id", userController.updateUserInfo)
// usersRouter.delete("/delete/:id", usersController.deleteOneUser)

module.exports = usersRouter
