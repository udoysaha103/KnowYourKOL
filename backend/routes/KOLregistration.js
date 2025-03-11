const express = require("express");
const router = express.Router();
const { submitVerificationRequest, verifyKOL } = require("../controllers/KOLregistration")

// submit verification request
router.post("/submitVerificationRequest", submitVerificationRequest);

// verify KOL
router.post("/verifyKOL", verifyKOL);

module.exports = router;