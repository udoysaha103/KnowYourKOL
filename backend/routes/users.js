const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getVerificationMail, verifyUser, getVerificationStatus, getPasswordResetMail, resetPassword} = require("../controllers/userControllers");

// signup route
router.post("/register", registerUser);

// login route
router.post("/login", loginUser);

// get verification status
router.post("/getVerificationStatus", getVerificationStatus);

// get verification mail
router.post("/getVerificationMail", getVerificationMail);
// get number of tires
// router.get("/getNumberOfTries/:email", getNumberOfTries);

// verify user
router.get("/verify/:token", verifyUser);

// get password reset mail with token
router.get("/getPasswordResetMail/:email", getPasswordResetMail);

// reset password with token
router.post("/reset", resetPassword);



module.exports = router;