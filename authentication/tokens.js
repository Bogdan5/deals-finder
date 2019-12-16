const { sign } = require('jsonwebtoken');

const createAccessToken = (user_id) => sign({ user_id }, process.env.accessSecretOrKey, {
  expiresIn: '15m'
});

const createRefreshToken = (user_id) => sign({ user_id }, process.env.refreshSecretOrKey, {
  expiresIn: '7d'
});

const sendAccessToken = (req, res, accessToken) => res.send({
  accessToken,
  username: req.body.username
})

const sendRefreshToken = (req, res, refreshToken) => res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  path: '/refresh_token'
});

module.exports = { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken };