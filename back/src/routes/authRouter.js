const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");
const UserMiddleware  = require("../middlewares/user.middleware");
const AuthMiddleware = require("../middlewares/auth.middleware");


const authController = new AuthController()
const authRouter = Router()
const userMidd = new UserMiddleware()
const authMidd = new AuthMiddleware()

authRouter.post("/signUp", userMidd.validateUserSignUp, authController.userSignUp)
authRouter.post("/logIn",  userMidd.validateUserSignIn, authController.userLogIn)
authRouter.post("/logOut", authMidd.validateUserToken, authController.userLogOut)

module.exports = authRouter;