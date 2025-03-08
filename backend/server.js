require('dotenv').config()

const express = require('express')
const {MongoClient} = require('mongodb')

const client = new MongoClient(process.env.MONGO_URI);
client.connect()
  .then(() => {
    console.log('connected to database')
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })
module.exports = client


const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
// app.use('/api/workouts', workoutRoutes)
app.use('/api/users', require('./routes/userRoutes'))