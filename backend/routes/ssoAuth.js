require("dotenv").config();
const express = require("express");
const router = express.Router();
const config = require("../utils/config");
const jwt = require("jsonwebtoken");

router.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) { return next(err); }
    });
});

router.get("/login", (req, res) => {
    if (req.user) {
        const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, {
            expiresIn: config.user.expairsIn,
        });
        res.status(200).json({ username: req.user.username, email: req.user.email, token, verificationStatus: req.user.verificationStatus });
    }else{
        res.status(401).json({ error: "User not authenticated" });
    }
})
router.get("/failure", (req, res) => {
    res.send("Failed to login");
})

module.exports = router;