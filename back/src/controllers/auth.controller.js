const AuthService = require("../services/auth.service.js");
const authService = new AuthService();


class AuthController {
    async userSignUp(req, res) {
        const userData = req.body;
        try {
            const newUser = await authService.createNewUser(userData);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(409).json({ error: "New user error" });
        }
    }

    async userLogIn(req, res) {
        const {user} = res.locals
        try{
            const { accessToken } = await authService.userLogIn(user, res);
            res.json({ accessToken });
        }catch (error){
            res.json({ error });
        }
    }

    async userLogOut(req, res) {
        try{
            await authService.userLogOut(res);
            res.status(200).json({ message: 'Logout exitoso' });
        } catch (error){
            res.json({ message: "Error durante el logout", error });
        }   
    }
}

module.exports = AuthController;
