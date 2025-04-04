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
        res.status(200).json({ email: req.user.email, token });
    }
})
router.get("/failure", (req, res) => {
    res.send("Failed to login");
})

router.get("/twitterLogin", passport.authenticate('twitter', {
    scope: ['users.read', 'tweet.read']
}));

// twitter callback
router.get('/redirect', passport.authenticate('twitter', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: `${process.env.SERVER_URL}/twitter/failure`
}));

module.exports = router;