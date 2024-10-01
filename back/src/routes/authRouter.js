const { Router } = require("express");

const authRouter = Router()

authRouter.post("/register", authController.userRegistration)
authRouter.post("/signIn", authController.userSignIn)
authRouter.post("/logOut", authController.userlogOut)