const client = require('../server')
const database = client.db('KnowYourKOL')
const users = database.collection('Users')
module.exports = users
