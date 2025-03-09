// to securely use the environment variables in the .env file
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const cookieSession = require('cookie-session');
const User = require('./models/userModel')
// const { twitterCallback } = require("./controllers/userController");

const mongoose = require("mongoose");

const app = express();

// middlewares
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
// set up session cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.JWT_SECRET]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  googleUserModel.findById(id).then((user) => {
    done(null, user);
  });
});
passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: "http://127.0.0.1:5000/auth/twitter/callback"
},
function(token, tokenSecret, profile, cb) {
  console.log(token, tokenSecret, profile)
}
));


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// all the API routes
const userRouter = require("./routes/users");
const authRouter = require("./routes/twitterAuth");
app.use("/user", userRouter);
app.use("/auth", authRouter);

// connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });