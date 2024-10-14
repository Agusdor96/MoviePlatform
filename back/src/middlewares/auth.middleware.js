const Exceptions = require("../utils/customExceptions")
const tokenHelper = require("../helpers/token.helper.js");
const { accessTokenSecret, refreshTokenSecret } = require("../config/jwtCon.js");

class AuthMiddleware {
    validateUserToken(req, res, next){
        const authHeader = req.headers.authorization
        if(!authHeader) return next(Exceptions.Forbidden("Esta ruta esta protegida, debe colocar Authorization en el header"))
           
        const token = authHeader.split(" ")[1];
        if(!token) return next(Exceptions.Forbidden("No se encontro el bearer token"))
        
        try{
            const secret = accessTokenSecret
            const userPayload = tokenHelper.verifyToken(token, secret)

            if (userPayload.role === 'admin') {
                userPayload.asignRole = ['admin'];
            } else {
                userPayload.asignRole = ['user'];
            }
            req.user = userPayload
            next()
        } catch (error){
            return next(Exceptions.Unauthorized())
        }
    }

    validateUserRole(requiredRole) {
        return (req, res, next) => {
            const user = req.user;
    
            if (!user || !user.asignRole) return next(Exceptions.Forbidden());
    
            const hasRole = requiredRole.some((role) => user.asignRole.includes(role));
    
            if (!hasRole) return next(Exceptions.Forbidden());
    
            next();
        }
    }

    validateUserLogOut(req, res, next){
        const authHeader = req.headers.authorization
        if(!authHeader) return next(Exceptions.Forbidden("Esta ruta esta protegida, debe colocar Authorization en el header"))
           
        const token = authHeader.split(" ")[1];
        if(!token) return next (Exceptions.Forbidden("No se encontro el bearer token"))
        
        const refreshToken =  req.cookies?.refreshToken;
        if(!refreshToken) return next (Exceptions.Forbidden("No se encontro el refresh token"))
        
        try{
            const secret = accessTokenSecret
            const userPayload = tokenHelper.verifyToken(token, secret)

            const refreshSecret = refreshTokenSecret
            const refreshPayload = tokenHelper.verifyToken(refreshToken, refreshSecret)

            if(userPayload.id !== refreshPayload.id) return next(Exceptions.Unauthorized("Los tokens no coinciden, logout fallido"))
            next()
        } catch (error){
            return next(Exceptions.Unauthorized())
        }
    }
    
}

module.exports = AuthMiddleware