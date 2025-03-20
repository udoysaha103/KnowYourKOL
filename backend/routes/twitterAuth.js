require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");


// router.get("/logout", (req, res) => {
//   if (req.user) {
//     req.logout();
//   }
//   res.redirect(process.env.CLIENT_URL);
// });

// router.get("/success", (req, res) => {
//  res.send("success");
// });

// router.get("/login", (req, res) => {
//   if (req.user) {
//     const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, {
//       expiresIn: "5d",
//     });

//     res.status(200).json({ email: req.user.emails[0].value, token });
//   } else {
//     res.redirect(process.env.CLIENT_URL);
//   }
// })

// // login with twitter
// router.get("/twitterLogin", passport.authenticate('twitter'));

// // twitter callback
// router.get('/twitter/redirect', passport.authenticate('twitter', {
//   successRedirect: process.env.CLIENT_URL,
// }));

// // above 2 requests are not added in requests.rest, test it in browser.

module.exports = router;