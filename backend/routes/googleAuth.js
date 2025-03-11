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
            expiresIn: config.token.expairsIn,
        });

        res.status(200).json({ email: req.user.emails[0].value, token });
    } else {
        res.redirect(process.env.CLIENT_URL);
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
router.get('/google/redirect', passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "http://localhost:5000/auth/failure"
}));


module.exports = router;