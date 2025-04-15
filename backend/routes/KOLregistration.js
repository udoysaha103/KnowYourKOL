const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middlewares/fileUpload");
const { submitVerificationRequest, verifyKOL } = require("../controllers/KOLregistration")
const requireAuth = require("../middlewares/requireAuth");

// submit verification request
router.post("/submitVerificationRequest", uploadMiddleware, submitVerificationRequest);

// verify KOL
router.post("/verifyKOL", requireAuth, verifyKOL);

module.exports = router;