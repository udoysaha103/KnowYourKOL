const express = require('express')

const { getUsers, addUser } = require('../controllers/userControllers')

const router = express.Router()

router.get('/', getUsers)
router.post('/add', addUser)    

module.exports = router