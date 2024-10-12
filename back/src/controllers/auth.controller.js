const AuthService = require("../services/auth.service.js");
const authService = new AuthService();
const cookieHelper = require("../helpers/cookie.helper.js")

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
        const { accessToken, refreshToken } = await authService.userLogIn(user);
        cookieHelper.setRefreshTokenCookie(res, refreshToken);

        res.json({ accessToken });
    }catch (error){
        res.json({ error });
    }
  }

  async userLogOut(req, res) {

  }
}

module.exports = AuthController;
