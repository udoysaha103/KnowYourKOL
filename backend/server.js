// to securely use the environment variables in the .env file
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');
const userModel = require("./models/userModel");
const { googleCallback } = require("./controllers/userControllers");

const mongoose = require("mongoose");

const app = express();

require("./cron/SolanaCron"); // start the cron job to update the SOL to USD rate
require("./cron/GMGN_cron"); // start the cron job to update the PnL data


// middlewares
app.use(cors({
    origin: "http://localhost:5173", // Ensure this matches exactly (no extra `/`)
    credentials: true, // Allow cookies or auth headers if needed
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
  })
);


app.use(express.json());
// set up session cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.JWT_SECRET],
  httpOnly: false
}));
// register regenerate & save after the cookieSession middleware initialization
app.use((req, res, next) => {
    if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb) => {
            cb()
        }
    }
    if (req.session && !req.session.save) {
        req.session.save = (cb) => {
            cb()
        }
    }
    next()
})

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  userModel.findById(id).then((user) => {
    done(null, user);
  });
});
passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: "/auth/twitter/redirect"
},
function(token, tokenSecret, profile, cb) {
  console.log(token, tokenSecret, profile)
}
));
passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/google/redirect'
  }, googleCallback)
);


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// all the API routes
const userRouter = require("./routes/users");
const twitterAuthRouter = require("./routes/twitterAuth");
const googleAuthRouter = require("./routes/googleAuth"); 
const KOLregistrationRouter = require("./routes/KOLregistration");
const getKOLRouter = require("./routes/getKOL");
const reviewRouter = require("./routes/review");
app.use("/user", userRouter);
app.use("/twitter", twitterAuthRouter);
app.use("/google", googleAuthRouter);
app.use("/KOLregister", KOLregistrationRouter);
app.use("/getKOL", getKOLRouter);
app.use("/review", reviewRouter);

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