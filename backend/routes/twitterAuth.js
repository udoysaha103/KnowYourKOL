require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const config = require("../utils/config");
const axios = require("axios");
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

const authUrl = 'https://twitter.com/i/oauth2/authorize';
const tokenUrl = 'https://api.twitter.com/2/oauth2/token';
const userUrl = 'https://api.twitter.com/2/users/me';

// Hard-coded code challenge/verifier for simplicity (use PKCE in production)
const codeChallenge = 'challenge'; // Replace with a proper PKCE challenge in production
const codeVerifier = 'verifier';  // Replace with a proper PKCE verifier

// Step 1: Redirect to Twitter login
router.get('/twitterLogin', (req, res) => {
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.TWITTER_CLIENT_ID,
        redirect_uri: `${process.env.BASE_URL}/twitter/redirect`,
        scope: 'users.read tweet.read',
        state: 'state123' // Random state for security
        // code_challenge: codeChallenge,
        // code_challenge_method: 'plain'
    });
    res.redirect(`${authUrl}?${params.toString()}`);
});

// Step 2: Handle callback and exchange code for token
router.get('/redirect', async (req, res) => {
    const { code, state } = req.query;

    try {
        // Exchange code for access token
        const tokenResponse = await axios.post(tokenUrl, {
            grant_type: 'authorization_code',
            client_id: process.env.TWITTER_CLIENT_ID,
            client_secret: process.env.TWITTER_CLIENT_SECRET,
            code,
            redirect_uri: `${process.env.BASE_URL}/twitter/redirect`
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const accessToken = tokenResponse.data.access_token;

        // Fetch user data
        const userResponse = await axios.get(userUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { 'user.fields': 'username' } // Add 'email' if approved
        });

        const userData = {
            username: userResponse.data.data.username,
            id: userResponse.data.data.id
        };

        res.send(`Hello, @${userData.username}!`);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.send('Authentication failed');
    }
});



module.exports = router;