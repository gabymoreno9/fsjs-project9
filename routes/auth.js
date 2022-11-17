const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

async function checkAuth(req, res, next) {
  // From https://stackoverflow.com/questions/23616371/basic-http-authentication-with-node-and-express-4
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [email, password] = Buffer.from(b64auth, 'base64').toString().split(':')

  try {
    if (email && password) {
      let user = await User.findOne({ where: { emailAddress: email }})
      if (user && bcrypt.compareSync(password, user.password)) {
        req.user = user
        return next()
      }
    }
    next(createError(401, "Access Denied"))
  }
  catch (error) {
    next(error)
  }
}

module.exports = { checkAuth }