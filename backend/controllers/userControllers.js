const User = require('../models/userModel')
const mongoose = require('mongoose')

// get all users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({createdAt: -1})

  res.status(200).json(users)
}
// add a user
const addUser = async (req, res) => {
  const { username } = req.body

  try{
    const user = await User.create({ 
        _id: new mongoose.Types.ObjectId(), 
        username 
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
    getUsers,
    addUser
}