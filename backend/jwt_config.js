const jwt = require('jsonwebtoken');

const jwtConfig = {
  secretKey: 'you_shell_not_pass!', // JWT signing key
  algorithm: 'HS256', // encryption algorithm
  expiresIn: '1h'  // expire time
}

const setToken = (payload) => {
  return jwt.sign(payload, jwtConfig.secretKey, { expiresIn: jwtConfig.expiresIn, algorithm: jwtConfig.algorithm });
}

const getPayload = (req) => {
  try {
    const token = req.headers.authorization.split(' ')[0] === 'Bearer' ? req.headers.authorization.split(' ')[1] : null
    return jwt.verify(token, jwtConfig.secretKey);
  } catch (error) {
    return null;
  }
}

module.exports = { setToken, getPayload }