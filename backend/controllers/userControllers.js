const userCollection = require('../models/users')

const getUsers = async (req, res) => {
    try {
        const users = await userCollection.find().toArray()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const addUser = async (req, res) => {
    const username = req.body.username
    try{
        await userCollection.insertOne({username})
        res.json('User added!')
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
}
module.exports = {
    getUsers,
    addUser
}