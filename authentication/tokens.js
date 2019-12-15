const { sign } = require('jsonwebtoken');

const createAccessToken = (username) => sign({ username }, process.env.accessSecretOrKey, {
  expiresIn: '15m'
});

const createRefreshToken = (username) => sign({ username }, process.env.refreshSecretOrKey, {
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

module.export = { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken };