
const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  };

const clearRefreshTokenCookie = (res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
    sameSite: 'strict',
  });
}

module.exports = {
    setRefreshTokenCookie,
    clearRefreshTokenCookie
}
  