const jwt = require('jsonwebtoken');
const { accessTokenSecret, refreshTokenSecret, accessTokenLife, refreshTokenLife } = require('../config/jwtCon.js');



const generateTokens = (user) => {
  const accessToken = jwt.sign(
                        { id: user._id, role: user.role },
                        accessTokenSecret,
                        { expiresIn: accessTokenLife }
                      );
  const refreshToken =  jwt.sign(
                          { id: user._id },
                          refreshTokenSecret,
                          { expiresIn: refreshTokenLife }
                        );
  return { accessToken, refreshToken };
};

const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

module.exports = {
    generateTokens,
    verifyToken
}