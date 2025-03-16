const express = require("express");
const router = express.Router();
const upload = require("../middlewares/fileUpload");
const { submitVerificationRequest, verifyKOL } = require("../controllers/KOLregistration")

// submit verification request
router.post("/submitVerificationRequest", upload, submitVerificationRequest);

// verify KOL
router.post("/verifyKOL", verifyKOL);

module.exports = router;