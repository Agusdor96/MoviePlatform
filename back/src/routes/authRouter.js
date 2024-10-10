const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");
const { validateUserData } = require("../middlewares/user.middleware");

const authController = new AuthController()
const authRouter = Router()

authRouter.post("/signUp", validateUserData, authController.userSignUp)
authRouter.post("/logIn", authController.userLogIn)
authRouter.post("/logOut", authController.userLogOut)

module.exports = authRouter;