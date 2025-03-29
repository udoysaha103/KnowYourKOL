const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await userModel.findOne({ _id })
    if(!req.user) {
      throw Error('User not found')
    }
    next()

  } catch (error) {
    res.status(401).json({error: error.message})
  }
}

module.exports = requireAuth