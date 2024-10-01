const AuthService = require("../services/auth.service");

const authService = new AuthService()

class AuthController {
    async userSignUp(req, res) {
        const userData = req.body;
        try{
            const newUser = await authService.createNewUser(userData)
            res.status(201).json(newUser)
        }catch(err){
            res.status(409).json({error: "New user error"})
        }
    }

    async userLogIn(req, res) {
        }

    async userLogOut(req, res) {
    }
}

module.exports = AuthController;