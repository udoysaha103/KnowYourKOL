const express = require('express');
const app = express();
const path = require("path");
const cors = require('cors');
app.use(express.json());
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();


// const userRouter = require('./routes/user');
// app.use('/user', userRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});