// to securely use the environment variables in the .env file
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const passport = require('passport');
const TwitterStrategy = require("@superfaceai/passport-twitter-oauth2").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');
const userModel = require("./models/userModel");
const path = require("path");
const requestBioController = require("./controllers/requestBioController");
const { callback } = require("./controllers/userControllers");

const mongoose = require("mongoose");

const app = express();

// start the cron jobs
require("./cron/SolanaCron"); // start the cron job to update the SOL to USD rate
require("./cron/GMGN_cron"); // start the cron job to update the PnL data
require("./cron/memeCron"); // start the cron job to update the meme coin data


// middlewares
const allowedOrigins = ["http://knowyourkol.io", "http://localhost:5173", "https://knowyourkol.io", "http://www.knowyourkol.io", "https://www.knowyourkol.io"];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Allow cookies or auth headers if needed
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
}));


app.use(express.json());
// set up session cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.JWT_SECRET],
  httpOnly: false,
  domain: '.knowyourkol.io'
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
passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/google/redirect`
  }, callback)
);
passport.use(
  new TwitterStrategy(
    {
      clientType: "public",
      clientID: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: '/twitter/redirect',
    }, callback)
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
const bubbleRouter = require("./routes/getBubblesData");
app.use("/user", userRouter);
app.use("/twitter", twitterAuthRouter);
app.use("/google", googleAuthRouter);
app.use("/KOLregister", KOLregistrationRouter);
app.use("/getKOL", getKOLRouter);
app.use("/review", reviewRouter);
app.post("/request-bio-update", requestBioController);
app.use("/bubble", bubbleRouter);
app.use("/uploads",express.static(path.join(__dirname, "./uploads/")));


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