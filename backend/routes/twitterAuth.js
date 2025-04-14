require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/twitterLogin", passport.authenticate('twitter', {
    scope: ['users.read', 'tweet.read']
}));

// twitter callback
router.get('/redirect', passport.authenticate('twitter', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: `${process.env.SERVER_URL}/twitter/failure`
}));

module.exports = router;