const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");
const { UserMiddleware } = require("../middlewares/user.middleware");

const authController = new AuthController()
const authRouter = Router()
const userMidd = new UserMiddleware()

authRouter.post("/signUp", userMidd.validateUserSignUp, authController.userSignUp)
authRouter.post("/logIn",  userMidd.validateUserSignIn, authController.userLogIn)
authRouter.post("/logOut", authController.userLogOut)

module.exports = authRouter;