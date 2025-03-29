const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const upload = require("../middlewares/fileUpload");
const { verifyAdmin, getUnverifiedKOLs, getVerifiedKOLs, editUnverifiedKOL } = require("../controllers/adminController.js");

router.get("/verifyAdmin", requireAuth, verifyAdmin);

router.get("/unverifiedKOLs", requireAuth, getUnverifiedKOLs);

router.get("/verifiedKOLs", requireAuth, getVerifiedKOLs);

router.post("/editUnverifiedKOL", [requireAuth, upload], editUnverifiedKOL);

module.exports = router;