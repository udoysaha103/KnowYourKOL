require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");


router.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


router.get("/login", (req, res) => {
    if (req.user) {
        const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, {
            expiresIn: config.user.expairsIn,
        });
        res.status(200).json({ username: req.user.username, email: req.user.email, token, verificationStatus: req.user.verificationStatus });
    }
})
router.get("/failure", (req, res) => {
    res.send("Failed to login");
})

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