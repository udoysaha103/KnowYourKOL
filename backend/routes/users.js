const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getAllUsers, getVerificationMail, getNumberOfTries, verifyUser } = require("../controllers/userControllers");
const requireAuth = require("../middlewares/requireAuth");

// signup route
router.post("/register", registerUser);

// login route
router.post("/login", loginUser);

// get all users
router.get("/", requireAuth, getAllUsers);

// get verification mail
router.post("/getVerificationMail", getVerificationMail);
// get number of tires
// router.get("/getNumberOfTries/:email", getNumberOfTries);

// verify user
router.post("/verify", verifyUser);



module.exports = router;