const AuthService = require("../services/auth.service.js");
const authService = new AuthService();


class AuthController {
    async userSignUp(req, res) {
        const userData = req.body;

        const newUser = await authService.createNewUser(userData);
        res.status(201).json(newUser);
    }

    async userLogIn(req, res) {
        const {user} = res.locals

        const response = await authService.userLogIn(user, res);
        res.json({ response });
    }

    async userLogOut(req, res) {
        await authService.userLogOut(res);
        res.status(200).json({ message: 'Logout exitoso' });
    }
}

module.exports = AuthController;
