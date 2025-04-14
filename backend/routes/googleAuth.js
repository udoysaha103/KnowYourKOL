require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");

// login with google
router.get("/googleLogin", passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// google callback
router.get('/redirect', passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: `${process.env.SERVER_URL}/google/failure`
}));


module.exports = router;